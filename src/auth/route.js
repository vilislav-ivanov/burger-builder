const express = require('express');
const { registerController, loginController } = require('./controller');
const router = express.Router();

router.all('/register', registerController);
router.all('/login', loginController);

module.exports = router;
