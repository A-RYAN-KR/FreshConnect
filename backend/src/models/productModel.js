const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  bulkPrice: { type: Number }, // Price for bulk purchase
  images: [String], // Array of Cloudinary image URLs
  category: String,
  stockQuantity: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;