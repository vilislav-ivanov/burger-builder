const express = require('express');
const { registerController } = require('./controller');
const router = express.Router();

router.all('/register', registerController);
// router.all('/login', authController);

module.exports = router;
