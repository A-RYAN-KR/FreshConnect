const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const calculateTrustScore = require("../utils/trustScore");
const User = require("../models/userModel");

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const vendorId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.stockQuantity < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock" });
    }

    const totalPrice = product.price * quantity;

    const order = new Order({
      vendorId,
      supplierId: product.supplierId,
      productId,
      quantity,
      totalPrice,
    });

    await order.save();

    // Update product stock
    product.stockQuantity -= quantity;
    await product.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const orders = await Order.find({ vendorId })
      .populate("supplierId", "name") // 👈 Add this to get supplier's name
      .populate("productId", "name images") // 👈 Add this to get product details
      .sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// @desc    Get all orders for the current logged-in supplier
// @route   GET /api/orders/supplier
exports.getSupplierOrders = async (req, res) => {
  try {
    const supplierId = req.user.id;
    const orders = await Order.find({ supplierId })
      .populate("vendorId", "firstName lastName email") // Get the vendor's details
      .populate("productId", "name images") // Get the product's details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get supplier orders",
      error: error.message,
    });
  }
};

// ✅ ADD A FUNCTION TO UPDATE ORDER STATUS
// @desc    Update the status of an order
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Authorization: Ensure the logged-in user is the supplier for this order
    if (order.supplierId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to update this order",
      });
    }

    // --- MODIFIED LOGIC ---

    // 1. Update the status
    order.status = status;

    // 2. If the status is 'delivered', set the deliveredAt timestamp to now.
    //    This check ensures it only happens once when the status is first set.
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    // 3. Save the changes to the database
    await order.save();

    // 4. If the status was set to 'delivered', recalculate the trust score.
    //    This is placed after .save() to ensure the calculation uses the latest data.
    if (status === "delivered") {
      await calculateTrustScore(order.supplierId);
    }

    // --- END OF MODIFIED LOGIC ---

    // Populate the order with details before sending it back
    const populatedOrder = await Order.findById(order._id)
      .populate("vendorId", "firstName lastName email")
      .populate("productId", "name images");

    res.status(200).json({ success: true, order: populatedOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};