
const express = require('express');
const router = express.Router({ mergeParams: true });
const upload = require('../api/middleware/upload_file');
const auth = require('../api/middleware/is-auth');
const uploadController = require('../api/controllers/upload_image')
const userController = require('../api/controllers/user')

// router.post('/user', auth,  (req, res, next)=>{
//     if(req.isAuth){
//         next();
//     } else{
//         throw new Error('Unauthenticated')
//     }
// });

router.post('/upload', upload.single('image'),  uploadController.uploadImage);
router.post('/me', userController.getUserMe);

module.exports = router;