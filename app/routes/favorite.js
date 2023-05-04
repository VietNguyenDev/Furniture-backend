const express = require('express');

const { favorite: favoriteController } = require('../http/controllers');
const checkPermission = require('../http/middlewares/permission');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/favorite', auth, favoriteController.addFavorite);
router.delete(
  '/favorite',
  auth,
  checkPermission,
  favoriteController.removeFavorite
);

module.exports = router;
