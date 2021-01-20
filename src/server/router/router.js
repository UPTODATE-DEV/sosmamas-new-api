
const express = require('express');
const router = express.Router({ mergeParams: true });
const upload = require('../api/middleware/upload_file');
const userController = require('../api/controllers/user')
const uploadController = require('../api/controllers/upload_image')

router.post('/upload', upload.single('image'),  userController.uploadProfile);
router.post('/graphql', upload.single('image'),  uploadController.uploadImage);

module.exports = router;