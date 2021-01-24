const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../model/User');
const { secretOrKey } = require('../../config/keys');

module.exports = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Already exists' });
      }
      const { errors, isValid } = require('../../validation/registerUser')(
        req.body
      );

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, encrypted) => {
          if (err) return console.log(err);
          newUser.password = encrypted;
          newUser
            .save()
            .then((user) => {
              jwt.sign(
                { _id: user._id, email: user.email },
                secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    return res.status(500).json(err);
                  }
                  return res.json({ token: 'Bearer ' + token });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
};
