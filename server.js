const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Order schema and model
const orderSchema = new mongoose.Schema({
    customerName: String,
    items: Array,
    total: Number,
    status: { type: String, default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API route to handle order submission
app.post('/submit-order', async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        await newOrder.save();
        res.status(200).send('Order saved successfully');
    } catch (err) {
        res.status(500).send('Error saving order');
    }
});

// API route for admin login
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'bhargavgouri@96' && password === 'bhargav@96') {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// API route to fetch pending orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Pending' });
        res.json(orders);
    } catch (err) {
        res.status(500).send('Error fetching orders');
    }
});

// API route to update order status
app.put('/orders/:id', async (req, res) => {
    const { status } = req.body;
    try {
        await Order.findByIdAndUpdate(req.params.id, { status });
        res.status(200).send('Order status updated');
    } catch (err) {
        res.status(500).send('Error updating order status');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
