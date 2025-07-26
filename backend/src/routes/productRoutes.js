const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');



// Only suppliers can create products
router.post('/', protect, uploadMiddleware.upload, productController.createProduct); // ✅
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', protect, productController.updateProduct); // Update product
router.delete('/:id', protect, productController.deleteProduct); // Delete product

module.exports = router;