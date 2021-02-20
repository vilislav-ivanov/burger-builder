const makeDb = require('../db');
const makeRepo = require('./repo');
const makeRegisterHandler = require('./register-handler');
const makeLoginHandler = require('./login-handler');

const db = makeDb();
const repo = makeRepo(db);
const registerHandler = makeRegisterHandler(repo);
const loginHandler = makeLoginHandler(repo);

module.exports = {
  registerHandler,
  loginHandler,
};
