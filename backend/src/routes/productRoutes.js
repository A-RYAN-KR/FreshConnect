const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');



// Only suppliers can create products
router.post(
  "/",
  protect,
  upload.array("images", 5),
  productController.createProduct
);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put(
  "/:id",
  protect,
  upload.array("images", 5), // <--- ADD THIS LINE BACK
  productController.updateProduct
);
router.delete('/:id', protect, productController.deleteProduct); // Delete product

module.exports = router;