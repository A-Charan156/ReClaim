const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Pure API Middleware
app.use(cors());
app.use(express.json()); // Essential for reading JSON from requests

// 2. Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// 3. Import & Use API Routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// 4. API Status Endpoint (Root)
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Backend API is Live' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// 5. Global Error Handler (Always returns JSON)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on port ${PORT}`);
});
