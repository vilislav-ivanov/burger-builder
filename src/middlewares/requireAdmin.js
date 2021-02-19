const User = require('../model/User');

module.exports = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.status(401);
      }
      if (!user.isAdmin) {
        return res.status(403).json({ user: 'Logged in user is not admin' });
      }
      next();
    })
    .catch((err) => console.log(err));
};
