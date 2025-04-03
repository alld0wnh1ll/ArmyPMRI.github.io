const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'https://armypmri.github.io'
}));
app.use(express.json());
app.use(express.static('public'));

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle GitHub OAuth callback
app.post('/auth/github/callback', async (req, res) => {
    const { code } = req.body;
    
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        }, {
            headers: {
                Accept: 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Token exchange failed:', error);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});

// Endpoint to serve Firebase config
app.get('/api/config', (req, res) => {
    // Only send necessary config items
    const clientConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };
    res.json(clientConfig);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 