const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const vendorId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
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
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const orders = await Order.find({ vendorId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get orders', error: error.message });
  }
};