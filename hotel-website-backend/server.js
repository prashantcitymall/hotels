require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hotel_website',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, dateOfBirth, phone, password } = req.body;

        // Check if user already exists
        const userExists = await pool.query(
            'SELECT * FROM users WHERE phone = $1',
            [phone]
        );

        if (userExists.rows.length > 0) {
            // If user exists, return their data for login
            const existingUser = userExists.rows[0];
            return res.status(200).json({
                message: 'User already exists',
                userId: existingUser.id,
                firstName: existingUser.first_name,
                lastName: existingUser.last_name,
                fullName: existingUser.full_name,
                phone: existingUser.phone
            });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        console.log('Registration - Password hashed successfully');
        console.log('Registration - Attempting to save user with hashed password');

        // Split full name into first and last name
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        console.log('Registration - Processing name parts:', {
            fullName,
            firstName,
            lastName
        });

        // Insert new user
        const result = await pool.query(
            'INSERT INTO users (full_name, first_name, last_name, date_of_birth, phone, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, full_name, first_name, last_name, phone',
            [fullName, firstName, lastName, dateOfBirth, phone, passwordHash]
        );

        const newUser = result.rows[0];
        console.log('Registration - New user created:', {
            id: newUser.id,
            fullName: newUser.full_name,
            firstName: newUser.first_name,
            lastName: newUser.last_name
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser.id,
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            phone: phone,
            token: 'dummy-token' // You should implement proper JWT token generation here
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Find user
        console.log('Login - Searching for user with phone:', phone);
        const result = await pool.query(
            'SELECT id, full_name, first_name, last_name, phone, password_hash, created_at FROM users WHERE phone = $1 ORDER BY created_at DESC LIMIT 1',
            [phone]
        );
        
        console.log('Login - Found user:', result.rows[0] ? {
            id: result.rows[0].id,
            fullName: result.rows[0].full_name,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            created_at: result.rows[0].created_at
        } : 'No user found');

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Verify password
        console.log('Login - Retrieved user:', { 
            id: user.id,
            phone: user.phone,
            full_name: user.full_name,
            has_password: !!user.password_hash
        });
        console.log('Login - Attempting password verification');
        
        const validPassword = await bcrypt.compare(password, user.password_hash);
        console.log('Login - Password verification result:', validPassword);
        
        if (!validPassword) {
            // Try to find user with a different password hash
            const allResults = await pool.query(
                'SELECT id, full_name, first_name, last_name, phone, password_hash FROM users WHERE phone = $1 ORDER BY created_at DESC',
                [phone]
            );
            
            // Try each password hash
            for (const row of allResults.rows) {
                const isValid = await bcrypt.compare(password, row.password_hash);
                if (isValid) {
                    user = row;
                    validPassword = true;
                    break;
                }
            }
        }
        
        if (!validPassword) {
            console.log('Login - Password verification failed');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Split full name if first_name is not available in the database
        let firstName = user.first_name;
        let lastName = user.last_name;
        
        if (!firstName && user.full_name) {
            const nameParts = user.full_name.split(' ');
            firstName = nameParts[0];
            lastName = nameParts.slice(1).join(' ');
        }

        // Ensure first_name and last_name are set
        let userFirstName = user.first_name;
        let userLastName = user.last_name;

        if ((!userFirstName || !userLastName) && user.full_name) {
            const nameParts = user.full_name.split(' ');
            userFirstName = userFirstName || nameParts[0];
            userLastName = userLastName || nameParts.slice(1).join(' ');

            // Update the database with the parsed names
            await pool.query(
                'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3',
                [userFirstName, userLastName, user.id]
            );
        }

        const responseData = {
            message: 'Login successful',
            userId: user.id,
            fullName: user.full_name || `${userFirstName} ${userLastName}`.trim(),
            firstName: userFirstName,
            lastName: userLastName,
            token: 'dummy-token',
            phone: user.phone
        };
        
        console.log('Login - Sending response:', {
            ...responseData,
            token: '***'
        });
        
        res.json(responseData);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
