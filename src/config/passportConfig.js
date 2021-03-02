const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { secretOrKey } = require('./keys');

module.exports = (passport, database) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey,
  };

  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const db = await database;
        const result = await db
          .collection('users')
          .findOne({ _id: db.makeId(payload._id) });
        if (result) {
          return done(null, result);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
