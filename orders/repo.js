const { DocumentNotFoundError } = require('../helpers/errors');
const makeOrder = require('./order');

function mapDocumentToOrder({ ...orderDocument }) {
  return makeOrder(orderDocument);
}

module.exports = function (database) {
  return Object.freeze({
    create,
    getAll,
    getById,
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
  async function getAll() {
    const db = await database;
    try {
      const result = await db.collection('orders').find().toArray();
      return {
        success: result instanceof Array,
        orders: result.map(mapDocumentToOrder),
      };
    } catch (error) {
      throw error;
    }
  }
  async function getById(orderId) {
    const db = await database;
    const result = await db
      .collection('orders')
      .findOne({ _id: db.makeId(orderId) });
    if (result) {
      return {
        success: true,
        order: result,
      };
    } else {
      throw new DocumentNotFoundError(orderId);
    }
  }
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

      if (result.value) {
        return {
          success: result.ok === 1,
          order: mapDocumentToOrder(result.value),
        };
      } else {
        throw new DocumentNotFoundError(orderId);
      }
    } catch (error) {
      throw error;
    }
  }
  async function remove(orderId) {
    const db = await database;
    try {
      const result = await db
        .collection('orders')
        .findOneAndDelete({ _id: db.makeId(orderId) });
      if (result.value) {
        return {
          success: result.ok === 1,
          deletedOrder: mapDocumentToOrder(result.value),
        };
      } else {
        throw new DocumentNotFoundError(orderId);
      }
    } catch (error) {
      throw error;
    }
  }
};