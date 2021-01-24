const Order = require('../../model/Order');

module.exports = (req, res) => {
  Order.findOne({ _id: req.params.orderId })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ order: 'Not found' });
      }
      Order.deleteOne({ _id: req.params.orderId })
        .then((response) => {
          return res.json({ deleted: true });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
