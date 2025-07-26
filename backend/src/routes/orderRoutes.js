const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getMyOrders);

router.get("/supplier", protect, orderController.getSupplierOrders);
router.put("/:id/status", protect, orderController.updateOrderStatus);

module.exports = router;