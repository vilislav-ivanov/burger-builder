const Order = require('../../model/Order');

module.exports = (req, res) => {
  Order.findOne({ _id: req.params.orderId })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ order: 'Not found' });
      }

      const { isValid, errors } = require('../../validation/changeOrderStage')(
        req.body
      );

      if (!isValid) {
        return res.status(400).json(errors);
      }

      order.stage = req.body.stage;
      order
        .save()
        .then((order) => {
          return res.json(order);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
