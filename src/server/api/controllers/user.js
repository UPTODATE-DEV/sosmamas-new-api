const models = require('../../models');

exports.uploadProfile = async (req, res) => {
    const fileName = req.fileName;
    const userId = req.body.userId;

    if (fileName) {
        const find = await models.Profile.findOne({ where: { userId: userId } },);
        if (find) {
            const update = await find.update(
                { avatar: fileName },
                { where: { userId: userId } }
            );
            res.status(200).json({
                profile: update
            });
        } else {
            const create = await models.Profile.create({
                userId: userId,
                avatar: fileName
            });
            res.status(200).json({
                profile: create
            });
        }
    } else {
        res.status(404).json({
            message: 'Bad format',
            path: '',
        });
    }

}