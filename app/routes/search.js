const express = require('express');

const { search: searchController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/search', auth, searchController.searchProduct);
module.exports = router;
