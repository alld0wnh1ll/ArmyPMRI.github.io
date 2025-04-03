require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Authentication middleware
const authenticateRequest = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (token !== config.API_KEY) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    next();
};

// Routes
app.post('/api/checkin', authenticateRequest, async (req, res) => {
    try {
        const { name, rank, branch, location, timestamp } = req.body;
        
        // Here you would typically save to your database
        // For now, we'll just return success
        res.json({ 
            success: true, 
            message: 'Check-in recorded successfully',
            data: { name, rank, branch, location, timestamp }
        });
    } catch (error) {
        console.error('Error processing check-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 