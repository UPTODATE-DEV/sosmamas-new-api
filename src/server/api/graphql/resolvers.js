const { withFilter } = require('apollo-server');
const subscription = require('./subscription');
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
                () => pubsub.asyncIterator([NEW_COMMENT]),
                (payload, args) => {
                    return true
                },
            ),
            resolve: (payload) => (payload.newComment)
        },
    },
    Query: query,
    Mutation: mutation,
    Periode: {
        async conseils(root, args, { models }) {
            return models.Conseil.findAll({ where: { periodeId: root.id } })
        },
        async symptomes(root, args, { models }) {
            return models.Symptome.findAll({ where: { periodeId: root.id } })
        },
    },
    Conseil: {
        async periode(root, args, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Symptome: {
        async periode(root, args, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Post: {
        async category(root, args, { models }) {
            return models.PostCategory.findOne({ where: { id: root.categoryId } })
        },
        async comments(root, args, { models }) {
            return models.Comment.findAll({ where: { id: root.id } })
        }
    },
    PostCategory: {
        async posts(root, args, { models }) {
            return models.Post.findAll({ where: { categoryId: root.id } })
        },
    },
};

module.exports = resolvers;