module.exports = function (database) {
  return Object.freeze({
    create,
    getAll,
    getCurrentUserOrders,
    update,
    remove,
  });

  async function create(order) {
    console.log(order, 'from repo');
    const db = await database;
    const { ops, result } = await db.collection('orders').insertOne(order);
    console.log(result);
    console.log(ops);
  }
  function getAll() {}
  function getCurrentUserOrders() {}
  function update() {}
  function remove() {}
};
