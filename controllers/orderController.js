const Order = require('../models/order');
const publisher = require('../utils/publisher');

exports.createOrder = async (req, res) => {
  const order = new Order({ product: req.body.product, status: 'pending' });
  await order.save();
  publisher.publishEvent('new_order', order);
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  publisher.publishEvent('order_updated', order);
  res.json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
