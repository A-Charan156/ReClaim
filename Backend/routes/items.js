const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const { type, category, location, date } = req.query;
        
        let filter = { status: 'active' };
        
        if (type && type !== 'all') filter.type = type;
        if (category && category !== 'all') filter.category = category;
        if (location && location !== 'all') filter.location = location;
        if (date) filter.date = new Date(date);
        
        const items = await Item.find(filter)
            .populate('postedBy', 'name email')
            .sort({ createdAt: -1 });
            
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create new item
router.post('/', auth, async (req, res) => {
    try {
        const { type, title, category, location, date, description, image, contact } = req.body;
        
        const item = new Item({
            type,
            title,
            category,
            location,
            date,
            description,
            image,
            contact,
            postedBy: req.user._id
        });
        
        await item.save();
        await item.populate('postedBy', 'name email');
        
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Claim/Found item
router.put('/:id/claim', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        item.status = item.type === 'lost' ? 'claimed' : 'returned';
        item.claimedBy = req.user._id;
        
        await item.save();
        res.json({ message: 'Item claimed successfully', item });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        // Check if user owns the item
        if (item.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;