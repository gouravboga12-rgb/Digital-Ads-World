const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { supabase, isConfigured } = require('../supabaseClient');
const mockData = require('../mockData');

// @route   GET api/leads
// @desc    Get all leads (Admin only)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  if (!isConfigured) {
    return res.json(mockData.getLeads());
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/leads
// @desc    Submit a new lead (Public)
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required fields.' });
  }

  if (!isConfigured) {
    const newLead = mockData.addLead({ name, email, phone, service, message });
    return res.status(201).json(newLead);
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email, phone, service, message }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/leads/:id
// @desc    Update lead status (Admin only)
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  if (!isConfigured) {
    const updated = mockData.updateLeadStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: 'Lead not found' });
    return res.json(updated);
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Lead not found' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE api/leads/:id
// @desc    Delete a lead (Admin only)
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!isConfigured) {
    const deleted = mockData.deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Lead not found' });
    return res.json({ success: true, message: 'Lead deleted successfully' });
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .delete()
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
