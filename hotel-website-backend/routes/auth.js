const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hotels_db',
  password: 'your_password',
  port: 5432,
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Get user from database
    const userResult = await pool.query(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      full_name: `${user.first_name} ${user.last_name}`,
      phone: user.phone
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, password, dateOfBirth } = req.body;

    // Split full name into first and last name
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, phone, password, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, phone, hashedPassword, dateOfBirth]
    );

    // Create token
    const token = jwt.sign(
      { id: newUser.rows[0].id, phone },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      token,
      full_name: `${firstName} ${lastName}`,
      phone
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
