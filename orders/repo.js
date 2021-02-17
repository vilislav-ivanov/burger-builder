const makeOrder = require('./order');

function mapDocumentToOrder({ ...orderDocument }) {
  return makeOrder(orderDocument);
}

module.exports = function (database) {
  return Object.freeze({
    create,
    getAll,
    getCurrentUserOrders,
    edit,
    remove,
  });

  async function create(order) {
    const db = await database;
    const { ops, result } = await db.collection('orders').insertOne(order);
    return {
      success: result.ok === 1,
      order: ops[0],
    };
  }
  function getAll() {}
  function getCurrentUserOrders() {}
  async function edit({ orderId, ...orderInfo }) {
    const db = await database;
    const order = {
      $set: {
        ...orderInfo,
      },
    };
    try {
      const result = await db
        .collection('orders')
        .findOneAndUpdate({ _id: db.makeId(orderId) }, order, {
          returnOriginal: false,
        });
      return {
        success: result.ok === 1,
        order: mapDocumentToOrder(result.value),
      };
    } catch (error) {
      throw error;
    }
  }
  function remove() {}
};
