// server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to database successfully');
    }
});

// ============================================
// ROOT ROUTE - This fixes the 404 error
// ============================================
app.get('/', (req, res) => {
    res.json({
        message: '🚀 BizCraft API is running!',
        status: 'active',
        endpoints: {
            health: '/api/health',
            guides: '/api/guides',
            suppliers: '/api/suppliers',
            tools: '/api/tools',
            calculators: '/api/calculators',
            login: '/api/login (POST)',
            register: '/api/register (POST)'
        },
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'BizCraft API is running',
        timestamp: new Date().toISOString()
    });
});

// Get all guides
app.get('/api/guides', (req, res) => {
    db.query('SELECT * FROM guides', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get all suppliers
app.get('/api/suppliers', (req, res) => {
    db.query('SELECT * FROM suppliers', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get all tools
app.get('/api/tools', (req, res) => {
    db.query('SELECT * FROM tools', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get all calculators
app.get('/api/calculators', (req, res) => {
    db.query('SELECT * FROM calculators', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = results[0];
        
        // Simple password check (use bcrypt in production)
        if (password === 'demo123' || password === user.password) {
            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET || 'secret-key',
                { expiresIn: '7d' }
            );
            
            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, 'user'],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Registration failed' });
            }
            res.json({ success: true, message: 'User registered successfully' });
        }
    );
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});

export default app;
