const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Complaint = require("../models/complaintModel"); // <-- IMPORT COMPLAINT MODEL

exports.getSupplierDashboardStats = async (req, res) => {
  try {
    const supplierId = req.user.id;
    const supplierObjectId = new mongoose.Types.ObjectId(supplierId);

    const [
      // Original Stats
      revenueResult,
      activeOrders,
      productsListed,
      supplier,
      ratingResult,
      // Analytics Charts
      revenueOverTimeData,
      orderStatusData,
      topProductsData,
      // --- NEW KPI Queries ---
      deliveredOrdersCount,
      avgFulfillmentTimeResult,
      complaintsCount,
      complaintBreakdown,
      topVendors,
      lowStockProductsCount,
    ] = await Promise.all([
      // --- Original Stats & Analytics Queries (Unchanged) ---
      Order.aggregate([
        { $match: { supplierId: supplierObjectId, status: "delivered" } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
      Order.countDocuments({
        supplierId: supplierObjectId,
        status: { $in: ["pending", "processing", "shipped"] },
      }),
      Product.countDocuments({ supplierId: supplierObjectId }),
      User.findById(supplierId).select("trustScore").lean(),
      Review.aggregate([
        { $match: { supplierId: supplierObjectId } },
        { $group: { _id: "$supplierId", averageRating: { $avg: "$rating" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            supplierId: supplierObjectId,
            status: "delivered",
            orderDate: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$orderDate" },
              year: { $year: "$orderDate" },
            },
            revenue: { $sum: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            revenue: "$revenue",
          },
        },
      ]),
      Order.aggregate([
        { $match: { supplierId: supplierObjectId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, name: "$_id", value: "$count" } },
      ]),
      Order.aggregate([
        { $match: { supplierId: supplierObjectId, status: "delivered" } },
        { $group: { _id: "$productId", totalSold: { $sum: "$quantity" } } },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $project: {
            _id: 0,
            name: "$productDetails.name",
            totalSold: "$totalSold",
          },
        },
      ]),

      // --- NEW KPI Queries ---

      // 9. Count of delivered orders (for AOV and complaint rate)
      Order.countDocuments({
        supplierId: supplierObjectId,
        status: "delivered",
      }),

      // 10. Average Fulfillment Time
      Order.aggregate([
        {
          $match: {
            supplierId: supplierObjectId,
            status: "delivered",
            deliveredAt: { $exists: true },
          },
        },
        {
          $group: {
            _id: null,
            avgTime: {
              $avg: {
                $dateDiff: {
                  startDate: "$orderDate",
                  endDate: "$deliveredAt",
                  unit: "day",
                },
              },
            },
          },
        },
      ]),

      // 11. Total Complaints Count
      Complaint.countDocuments({ supplierId: supplierObjectId }),

      // 12. Complaint Breakdown by Reason
      Complaint.aggregate([
        { $match: { supplierId: supplierObjectId } },
        { $group: { _id: "$reason", count: { $sum: 1 } } },
        { $project: { _id: 0, name: "$_id", value: "$count" } },
        { $sort: { value: -1 } },
      ]),

      // 13. Top 3 Vendors (Customers) by total spend
      Order.aggregate([
        { $match: { supplierId: supplierObjectId, status: "delivered" } },
        { $group: { _id: "$vendorId", totalSpent: { $sum: "$totalPrice" } } },
        { $sort: { totalSpent: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "vendorInfo",
          },
        },
        { $unwind: "$vendorInfo" },
        {
          $project: {
            _id: 0,
            name: {
              $concat: ["$vendorInfo.firstName", " ", "$vendorInfo.lastName"],
            },
            totalSpent: "$totalSpent",
          },
        },
      ]),

      // 14. Count of products with low stock
      Product.countDocuments({
        supplierId: supplierObjectId,
        stockQuantity: { $lt: 10 },
      }), // Threshold is 10
    ]);

    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found." });
    }

    // --- Process Original Stats ---
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const averageRating = ratingResult[0]?.averageRating || 0;

    // --- Process NEW KPI Data ---
    const averageOrderValue =
      deliveredOrdersCount > 0 ? totalRevenue / deliveredOrdersCount : 0;
    const averageFulfillmentTime = avgFulfillmentTimeResult[0]?.avgTime ?? null; // null if no data
    const complaintRate =
      deliveredOrdersCount > 0
        ? (complaintsCount / deliveredOrdersCount) * 100
        : 0;

    // --- Format Analytics Data ---
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedRevenueOverTime = revenueOverTimeData.map((item) => ({
      name: `${monthNames[item.month - 1]} '${String(item.year).slice(2)}`,
      revenue: item.revenue,
    }));

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        activeOrders,
        productsListed,
        trustScore: supplier.trustScore || 0,
        averageRating: parseFloat(averageRating.toFixed(2)),
      },
      analytics: {
        revenueOverTime: formattedRevenueOverTime,
        orderStatusDistribution: orderStatusData,
        topSellingProducts: topProductsData,
      },
      // --- ADDED: KPIs Object ---
      kpis: {
        averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
        averageFulfillmentTime:
          averageFulfillmentTime !== null
            ? parseFloat(averageFulfillmentTime.toFixed(1))
            : "N/A",
        complaintRate: parseFloat(complaintRate.toFixed(2)),
        complaintBreakdown: complaintBreakdown,
        topVendors: topVendors,
        lowStockProductsCount: lowStockProductsCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats and analytics",
      error: error.message,
    });
  }
};