// backend/src/models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // This 'ref' property is what links this schema to the 'User' schema
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // <-- This MUST match the model name from `mongoose.model('User', ...)`
    required: true
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  bulkPrice: { type: Number },
  images: [String],
  category: String,
  stockQuantity: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);