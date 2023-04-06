const express = require('express');

const { orders: ordersController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');
const router = express.Router();

router.post('/orders', auth, checkPermission, ordersController.create);
router.get('/orders', auth, checkPermission, ordersController.getAllByUserId);

module.exports = router;
