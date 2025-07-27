const express = require('express');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const complaintRoutes = require("./routes/complaintRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// --- Global Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- Test Route ---
app.get('/api/test', (req, res) => {
    console.log("✅ /api/test route was hit successfully!");
    res.status(200).json({ message: "Success! The test route is public and working." });
});

// --- Mount Routes ---
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/supplier', supplierRoutes);


// --- Error Handling ---
// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;