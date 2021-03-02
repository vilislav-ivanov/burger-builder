const { makeToken } = require('../helpers/jwt');
const { compareEncryptedPassword } = require('../helpers/bcrypt');
const {
  WrongCredentialsError,
  UniqueConstraintError,
} = require('../helpers/errors');

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
      .insertOne({ emailAddress, password: hashedPassword })
      .catch((err) => {
        const duplicateKeyErrorCode = 11000;
        if (err.code == duplicateKeyErrorCode) {
          const duplicateKey = Object.keys(err.keyPattern)[0];
          throw new UniqueConstraintError(duplicateKey);
        }
      });
    const token = await makeToken({
      userId: ops[0]._id,
      emailAddress: ops[0].emailAddress,
    });
    return {
      success: result.ok === 1,
      token: `Bearer: ${token}`,
    };
  }
  async function login({ emailAddress, password }) {
    const db = await database;
    const result = await db
      .collection('users')
      .findOne({ emailAddress: emailAddress });
    if (result && (await compareEncryptedPassword(result.password, password))) {
      const token = await makeToken({
        userId: result._id,
        emailAddress: result.emailAddress,
      });
      return {
        success: true,
        token: `Bearer: ${token}`,
      };
    } else {
      // in case wrong email or wrong password
      throw new WrongCredentialsError();
    }
  }
};
