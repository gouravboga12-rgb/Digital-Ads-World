const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { supabase, isConfigured } = require('../supabaseClient');
const mockData = require('../mockData');

// @route   GET api/services
// @desc    Get all services (Public)
// @access  Public
router.get('/', async (req, res) => {
  if (!isConfigured) {
    return res.json(mockData.getServices());
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/services
// @desc    Add a service (Admin only)
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { title, slug, description, benefits, icon, order_index } = req.body;

  if (!title || !slug || !description || !icon) {
    return res.status(400).json({ message: 'Title, slug, description, and icon are required.' });
  }

  if (!isConfigured) {
    const newService = mockData.addService({ title, slug, description, benefits: benefits || [], icon, order_index: order_index || 0 });
    return res.status(201).json(newService);
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .insert([{ title, slug, description, benefits: benefits || [], icon, order_index: order_index || 0 }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/services/:id
// @desc    Update a service (Admin only)
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, slug, description, benefits, icon, order_index } = req.body;

  if (!isConfigured) {
    const updated = mockData.updateService(req.params.id, { title, slug, description, benefits, icon, order_index });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    return res.json(updated);
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .update({ title, slug, description, benefits, icon, order_index })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE api/services/:id
// @desc    Delete a service (Admin only)
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!isConfigured) {
    const deleted = mockData.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    return res.json({ success: true, message: 'Service deleted successfully' });
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .delete()
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
