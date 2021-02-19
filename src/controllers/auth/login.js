const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../model/User');
const { secretOrKey } = require('../../config/keys');

module.exports = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ user: 'Not found' });
      }
      const { errors, isValid } = require('../../validation/loginUser')(
        req.body
      );

      if (!isValid) {
        return res.status(400).json(errors);
      }

      bcrypt.compare(req.body.password, user.password, (err, doMatch) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (!doMatch) {
          return res.status(400).json({ password: 'Wrong password' });
        }
        // password match
        // generate token
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
      });
    })
    .catch((err) => console.log(err));
};
