const makeDb = require('../db');
const makeRepo = require('./repo');
const makeRegisterHandler = require('./register-handler');

const db = makeDb();
const repo = makeRepo(db);
const registerHandler = makeRegisterHandler(repo);

module.exports = {
  registerHandler,
};
