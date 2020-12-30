const { withFilter } = require('apollo-server');
// const subscription = require('./subscription');
const mutation = require('./mutation');
const query = require('./query');
const { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT } = require('./constants');

const resolvers = {
    Subscription: {
        newPeriode: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([NEW_PERIODE]),
                (payload, args) => {
                    return true
                },
            ),
            resolve: (payload) => (payload.newPeriode)
        },
        newPost: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([NEW_POST]),
                (payload, args) => {
                    return true
                },
            ),
            resolve: (payload) => (payload.newPost)
        },
        newComment: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_COMMENT),
                async (payload, args) => {
                    let postId = "";
                    await payload.newComment.then(function (result) {
                        postId = result.dataValues.postId;
                    })
                    return postId === args.postId;
                },
            ),
            resolve: (payload) => (payload.newComment)
        },
    },
    Query: query,
    Mutation: mutation,
    Periode: {
        async conseils(root, _, { models }) {
            return models.Conseil.findAll({ where: { periodeId: root.id } })
        },
        async symptomes(root, _, { models }) {
            return models.Symptome.findAll({ where: { periodeId: root.id } })
        },
    },
    Conseil: {
        async periode(root, _, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Symptome: {
        async periode(root, _, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Post: {
        async author(root, _, { user, models }) {
            // if (!user) {
            //     throw new Error('Unauthenticated!');
            // }
            return models.User.findByPk(root.authorId)
        },
        async category(root, _, { models }) {
            return models.PostCategory.findOne({ where: { id: root.categoryId } })
        },
        async comments(root, _, { models }) {
            return models.Comment.findAll({ where: { postId: root.id } })
        },
        async commentCount(root, _, { models }) {
            return models.Comment.count({ where: { postId: root.id } })
        },
        async likesCount(root, _, { models }) {
            return models.Like.count({ where: { resourceId: root.id } })
        },
        // async authCount(root, _, { models }) {
        //     return models.Like.count({ where: { resourceId: root.id } })
        // },
    },
    Comment: {
        async post(root, _, { models }) {
            return models.Post.findByPk(root.postId)
        },
        async user(root, _, { user, models }) {
            // if (!user) {
            //     throw new Error('Unauthenticated!');
            // }
            return models.User.findByPk(root.userId)
        },
    },
    PostCategory: {
        async posts(root, args, { user, models }) {
            return models.Post.findAll({ where: { categoryId: root.id } })
        },
    },
    User: {
        async profile(root, args, { user, models }) {
            // if (!user) {
            //     throw new Error('Unauthenticated!');
            // }
            return models.Profile.findOne({ where: { userId: root.id } })
        },
    },
};

module.exports = resolvers;