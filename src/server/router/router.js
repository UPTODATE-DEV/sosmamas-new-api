
const express = require('express');
const router = express.Router({ mergeParams: true });
const upload = require('../api/middleware/upload_file');
const models = require('../models');

router.post('/upload', upload.single('image'), (req, res, next) => {
    const fileName = req.fileName;
    const userId = req.body.userId;
    if (fileName) {
        const profile = models.Profile.findOrCreate({
            userId: userId,
            avatar: fileName
        }, {
            where: { userId: userId },

        }).then(([result, created]) => {
            console.log(created);
            if (created) {
                return created;
            } else {
                const update = result.update(
                    { avatar: fileName },
                    { where: { userId: userId } }
                );
                return update;
            }
        });
        res.status(200).json({
            profile
        });
    } else {
        res.status(404).json({
            message: 'Bad format',
            path: '',
        })
    }

});

module.exports = router;