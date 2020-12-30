
module.exports = ({
    async periode(root, { id }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Periode.findOne({ where: { id: id } })
    },
    async allPeriodes(root, args, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Periode.findAll()
    },
    async conseil(root, { id }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Conseil.findOne({ where: { id: id } })
    },
    async allConseil(_, args, { models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Conseil.findAll()
    },
    async symptome(_, { id }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Symptome.findOne({ where: { id: id } })
    },
    async allSymptome(root, args, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Post.findAll()
    },
    async post(_, { id }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.Post.findone({ where: { id: id } })
    },
    async posts(_, args, { user, models }) {
        // if (!user) {
        //     throw new Error('Unauthenticated!');
        // }
        return models.Post.findAll()
    },
    async category(_, { id }, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.PostCategory.findOne({ where: { id: id } })
    },
    async categories(_, args, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.PostCategory.findAll()
    },
    async comments(_, { postId }, { user, models }) {
        // if (!user) {
        //     throw new Error('Unauthenticated!');
        // }
        return models.Comment.findAll({ where: { postId: postId } })
    },

})
