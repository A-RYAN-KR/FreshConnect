const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have this
const { getSupplierDashboardStats } = require('../controllers/supplierController');

// This route will be mounted under a prefix like /api/supplier
router.get('/stats', protect, getSupplierDashboardStats);

module.exports = router;