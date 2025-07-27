const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes'); // <-- 1. IMPORT THE NEW ROUTE
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// Middleware (applied globally)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// In app.js, before app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
    console.log("✅ /api/test route was hit successfully!");
    res.status(200).json({ message: "Success! The test route is public and working." });
}); 
// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes); // <-- 2. MOUNT THE NEW ROUTE

// Catch-all route for undefined routes (optional)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;