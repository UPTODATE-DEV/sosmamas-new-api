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
        async category(root, _, { models }) {
            return models.PostCategory.findOne({ where: { id: root.categoryId } })
        },
        async comments(root, _, { models }) {
            return models.Comment.findAll({ where: { postId: root.id } })
        }
    },
    Comment: {
        async post(root, _, { models }) {
            return models.Post.findOne({ where: { id: root.postId } })
        }
    },
    PostCategory: {
        async posts(root, args, { models }) {
            return models.Post.findAll({ where: { categoryId: root.id } })
        },
    },
};

module.exports = resolvers;