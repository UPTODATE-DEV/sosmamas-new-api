
const models = require('../../models');

exports.uploadImage = async (req, res, next) => {
    console.log(req.body)
    const resource = req.body.resource;

    if (resource === 'user') {
        const fileName = req.filename;
        const userId = req.body.userId;
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