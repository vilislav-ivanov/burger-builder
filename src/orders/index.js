const makeDb = require('../db');
const makeRepo = require('./repo');
const makeOrdersEndPoint = require('./orders-handler');

const db = makeDb();
const repo = makeRepo(db);
const ordersEndPoit = makeOrdersEndPoint(repo);

module.exports = ordersEndPoit;
