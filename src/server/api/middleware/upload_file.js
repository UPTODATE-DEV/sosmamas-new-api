const multer = require('multer');
var uniqid = require('uniqid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/');
    },
    filename: function (req, file, cb) {
        
        const fileName = `${Math.floor(Date.now() / 1000)}${uniqid('')}.${file.originalname.split('.')[1]}`
        req.filename = fileName;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        console.log('+++++++++++++');
        req.fileName = null;
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
});

module.exports = upload;