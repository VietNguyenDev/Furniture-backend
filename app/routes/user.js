const express = require('express');
const { user: userController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.get('/users', userController.getUsers);
router.put('/users', upload.single('userImg'), userController.updateUser);
router.post('/users/:id', auth, checkPermission, userController.deleteUser )

module.exports = router;
