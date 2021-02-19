const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/User');
const { secretOrKey } = require('./keys');

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey,
  };

  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findOne({
        _id: payload._id,
      })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
