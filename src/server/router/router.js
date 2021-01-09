
const express = require('express');
const router = express.Router({ mergeParams: true });
const upload = require('../api/middleware/upload_file');
const userController = require('../api/controllers/user')

router.post('/upload', upload.single('image'),  userController.uploadProfile);

module.exports = router;