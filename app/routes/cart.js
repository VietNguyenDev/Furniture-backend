const express = require('express');

const { cart: cartController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.post('/cart', auth, checkPermission, cartController.addToCart);
router.get('/activeCart', auth, checkPermission, cartController.getActiveCart);
router.delete('/cart', auth, checkPermission, cartController.emptyCart);
module.exports = router;
