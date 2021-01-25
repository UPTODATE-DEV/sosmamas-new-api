
const express = require('express');
const router = express.Router({ mergeParams: true });
const upload = require('../api/middleware/upload_file');
const uploadController = require('../api/controllers/upload_image')

router.post('/upload', upload.single('image'),  uploadController.uploadImage);

module.exports = router;