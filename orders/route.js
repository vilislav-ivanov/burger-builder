const express = require('express');
const orderController = require('./controller');
const router = express.Router();

router.post('/', orderController);
router.get('/', orderController);
router.get('/user/all', orderController);
router.all('/:id', orderController);

module.exports = router;
