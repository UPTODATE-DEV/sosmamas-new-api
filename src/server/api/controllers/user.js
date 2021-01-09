const models = require('../../models');

exports.uploadProfile = async (req, res) => {
    const fileName = req.fileName;
    const userId = req.body.userId;

    if (fileName) {
        const find = await models.Profile.findOne({ where: { userId: userId } },);
        console.log(find)
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
        // const profile = await models.Profile.findOrCreate({
        //     userId: userId,
        //     avatar: fileName
        // }, {
        //     where: { userId: userId },

        // }).then(([result, created]) => {
        //     console.log(created);
        //     if (created) {
        //         return created;
        //     } else {
        //         const update = result.update(
        //             { avatar: fileName },
        //             { where: { userId: userId } }
        //         );
        //         return update;
        //     }
        // });
        // res.status(200).json({
        //     profile
        // });
    } else {
        res.status(404).json({
            message: 'Bad format',
            path: '',
        })
    }

}