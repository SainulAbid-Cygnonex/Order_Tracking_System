const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.createOrder);
router.put('/order/:id', orderController.updateOrder);
router.get('/order', orderController.getOrders);

module.exports = router;
