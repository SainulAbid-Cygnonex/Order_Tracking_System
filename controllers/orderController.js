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
  try {
    // Parse page and limit from query parameters, default to 1 and 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const totalOrders = await Order.countDocuments();

    // Fetch orders with pagination
    const orders = await Order.find().skip(skip).limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / limit);

    // Return paginated results with meta info
    res.json({
      page,
      limit,
      totalPages,
      totalOrders,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders with pagination:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
