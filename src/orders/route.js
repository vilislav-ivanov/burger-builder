const express = require('express');
const passport = require('passport');
const orderController = require('./controller');
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  orderController
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  orderController
);
router.all(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  orderController
);

module.exports = router;
