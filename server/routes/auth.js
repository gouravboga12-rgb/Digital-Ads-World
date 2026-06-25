const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12345';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkeychangeinproduction';

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({
      token,
      admin: { username: ADMIN_USERNAME, role: 'admin' }
    });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});

// @route   GET api/auth/check
// @desc    Check if authenticated
// @access  Private
router.get('/check', authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, admin: req.admin });
});

module.exports = router;
