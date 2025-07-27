const mongoose = require('mongoose');
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc    Get aggregated statistics for the supplier dashboard
// @route   GET /api/supplier/stats
// @access  Private (Supplier)
exports.getSupplierDashboardStats = async (req, res) => {
    try {
        const supplierId = req.user.id;

        // 1. Calculate Total Revenue (from delivered orders)
        const revenueResult = await Order.aggregate([
            { $match: { supplierId: new mongoose.Types.ObjectId(supplierId), status: 'delivered' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // 2. Count Active Orders (pending, processing, shipped)
        const activeOrders = await Order.countDocuments({
            supplierId: supplierId,
            status: { $in: ['pending', 'processing', 'shipped'] }
        });

        // 3. Count Products Listed by the supplier
        const productsListed = await Product.countDocuments({ supplierId: supplierId });

        // 4. Get Supplier's Trust Score and Rating from their User profile
        const supplier = await User.findById(supplierId).select('trustScore averageRating');
        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found.' });
        }

        res.status(200).json({
            success: true,
            stats: {
                totalRevenue,
                activeOrders,
                productsListed,
                trustScore: supplier.trustScore || 0,
                // NOTE: 'averageRating' must be a field in your User model.
                // You need to implement the logic to calculate and update it.
                averageRating: supplier.averageRating || 0,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats',
            error: error.message
        });
    }
};