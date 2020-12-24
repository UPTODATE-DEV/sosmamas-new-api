
module.exports = ({
    async periode(root, { id }, { models }) {
        return models.Periode.findOne({ where: { id: id } })
    },
    async allPeriodes(root, args, { models }) {
        return models.Periode.findAll()
    },
    async conseil(root, { id }, { models }) {
        return models.Conseil.findOne({ where: { id: id } })
    },
    async allConseil(root, args, { models }) {
        return models.Conseil.findAll()
    },
    async symptome(root, { id }, { models }) {
        return models.Symptome.findOne({ where: { id: id } })
    },
    async allSymptome(root, args, { models }) {
        return models.Post.findAll()
    },
    async post(root, { id }, { models }) {
        return models.Post.findone({ where: { id: id } })
    },
    async posts(root, args, { models }) {
        return models.Symptome.findAll()
    },
    async category(root, { id }, { models }) {
        return models.PostCategory.findOne({ where: { id: id } })
    },
    async categories(root, args, { user, models }) {
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        return models.PostCategory.findAll()
    },
    async comments(root, { postId }, { models }) {
        return models.Comment.findAll({ where: { postId: postId } })
    },

})
