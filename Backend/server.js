const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve from current directory

// Database connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lostnfound', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Basic route to test server
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/secpg.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../secpg.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: error.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test server: http://localhost:${PORT}/api/test`);
});