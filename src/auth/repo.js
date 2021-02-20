const { makeToken } = require('../helpers/jwt');

module.exports = function (database) {
  return Object.freeze({
    register,
    login,
  });
  async function register({ emailAddress, hashedPassword }) {
    // todo: save to db
    const db = await database;
    const { ops, result } = await db
      .collection('users')
      .insertOne({ emailAddress, hashedPassword });
    const token = await makeToken({
      userId: ops[0]._id,
      emailAddress: ops[0].emailAddress,
    });
    return {
      success: result.ok === 1,
      token: `Bearer: ${token}`,
    };
  }
  function login({ emailAddress, password }) {
    return {
      emailAddress,
      password,
    };
  }
};
