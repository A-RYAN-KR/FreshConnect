const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const calculateTrustScore = async (userId) => {
  const user = await User.findById(userId);
  if (!user || user.userType !== "supplier") return 0;

  const [products, orders, reviews] = await Promise.all([
    Product.find({ supplier: userId }),
    Order.find({ supplier: userId, status: "delivered" }),
    Review.find({ supplier: userId }),
  ]);

  let score = 0;
  const now = new Date();

  // === 1. Product Listings & Stock (20%) ===
  const inStockProducts = products.filter((p) => p.quantity > 0).length;
  const productScore = Math.min(inStockProducts / 10, 1) * 20;
  score += productScore;

  // === 2. Recent Delivered Orders (27%) ===
  const recentOrders = orders.filter((order) => {
    const deliveredAt = new Date(order.deliveredAt || order.updatedAt);
    const monthsOld = (now - deliveredAt) / (1000 * 60 * 60 * 24 * 30);
    return monthsOld <= 6;
  });
  const orderScore = Math.min(recentOrders.length / 10, 1) * 27;
  score += orderScore;

  // === 3. Review Quality (27%) ===
  let reviewScore = 0;
  if (reviews.length) {
    const weightedSum = reviews.reduce((acc, r) => {
      const ageFactor =
        1 - (now - new Date(r.createdAt)) / (1000 * 60 * 60 * 24 * 365); // 1 year decay
      const effectiveWeight = Math.max(ageFactor, 0.5); // min weight
      return acc + r.rating * effectiveWeight;
    }, 0);
    const avgWeightedRating = weightedSum / reviews.length;
    reviewScore = (avgWeightedRating / 5) * 27;
  }
  score += reviewScore;

  // === 4. Repeat Buyers (26%) ===
  const buyerOrderCount = {};
  orders.forEach((order) => {
    const buyerId = order.buyer?.toString();
    if (buyerId) {
      buyerOrderCount[buyerId] = (buyerOrderCount[buyerId] || 0) + 1;
    }
  });
  const repeatBuyers = Object.values(buyerOrderCount).filter(
    (count) => count > 1
  ).length;
  const repeatBuyerScore = Math.min(repeatBuyers / 5, 1) * 26;
  score += repeatBuyerScore;

  user.trustScore = Math.round(score);
  await user.save();

  return user.trustScore;
};

module.exports = calculateTrustScore;
