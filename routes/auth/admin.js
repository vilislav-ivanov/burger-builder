const express = require('express');
const router = express.Router();

const registerAdminController = require('../../controllers/admin/register');
const loginAdminController = require('../../controllers/admin/login');

router.post('/register', registerAdminController);
router.post('/login', loginAdminController);

module.exports = router;
