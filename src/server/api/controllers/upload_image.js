
const models = require('../../models');

exports.uploadImage = async (req, res, next) => {
    console.log(req.body)
    const resource = req.body.resource;

    const fileName = req.filename;
    if (resource === 'user') {
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
    } else if(resource === 'conseil'){
        const conseilId = req.body;
        const find = await models.Conseil.findOne({ where: { id: conseilId } },);
        if (find) {
            const update = await find.update(
                { image: fileName },
                { where: { id: conseilId } }
            );
            res.status(200).json({
                conseil: update
            });
        } else {
            res.status(404).json({
                message: 'Not Found',
                path: '',
            });
        }
    }
    else {
        res.status(404).json({
            message: 'Bad format',
            path: '',
        });
    }
}