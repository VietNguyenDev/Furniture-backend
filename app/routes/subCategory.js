const express = require('express');

const { subCategory: subCategoryController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.post('/subCategories', auth, checkPermission, upload.single('iconSubCategory'), subCategoryController.create);
router.get('/subCategories', subCategoryController.getList);
router.put('/subCategories/:subCategoryId', auth, checkPermission, upload.single('iconSubCategory'), subCategoryController.update);
router.delete('/subCategories/:subCategoryId', auth, checkPermission, subCategoryController.remove);

module.exports = router;