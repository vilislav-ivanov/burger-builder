const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');

async function makeToken({ userId, emailAddress }) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: userId, email: emailAddress },
      secretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
        if (!err) {
          return resolve(token);
        }
        return reject(err);
      }
    );
  });
}

module.exports = {
  makeToken,
};
