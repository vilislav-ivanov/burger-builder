const Order = require('../../model/Order');

const getAllOrders = (req, res, next) => {
  Order.find({})
    .then((orders) => {
      if (orders.length === 0) {
        return res.status(404).json({ orders: 'Orders not found' });
      }
      return res.json(orders);
    })
    .catch((err) => console.log(err));
};

module.exports = getAllOrders;
