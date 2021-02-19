const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../model/User');
const { secretOrKey } = require('../../config/keys');

module.exports = (req, res, next) => {
  // Only one admin user can be created
  User.findOne({ isAdmin: true })
    .then((user) => {
      console.log(user);
      if (user) {
        return res.status(400).json({ admin: 'Admin already exists' });
      }
      const { errors, isValid } = require('../../validation/registerUser')(
        req.body
      );

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const admin = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, (err, encrypted) => {
          if (err) return console.log(err);
          admin.password = encrypted;
          admin
            .save()
            .then((admin) => {
              jwt.sign(
                { _id: admin._id, email: admin.email, isAdmin: true },
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
