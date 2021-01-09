const { withFilter } = require('apollo-server-express');
// const subscription = require('./subscription');
const mutation = require('./mutation');
const query = require('./query');
const { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT } = require('./constants');

const resolvers = {
    Subscription: {
        newPeriode: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([NEW_PERIODE]),
                (_, __) => {
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
        resourcetLiked: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['NEW_RESSOURCE_LIKE']),
                async (payload, args) => {
                    let resourceId;
                    await payload.resoureLiked.then(function (result) {
                        resourceId = result.dataValues.id;
                    });
                    return resourceId === args.resourceId
                },
            ),
            resolve: async (payload, args, {connection}) => {
                console.log(connection)
                let resource;
                await payload.resoureLiked.then(function (result) {
                    resource = result.dataValues;
                });
                if (args.model === "Post") {
                    return { post: resource }
                } else {
                    return { comment: resource }
                }
            }
        },
        newComment: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_COMMENT),
                async (payload, args) => {
                    return payload.newComment.postId === args.postId;
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
        async tag(root, _, { models }) {
            return models.PostTag.findOne({ where: { id: root.tagId } })
        },
        async total(root, _, { models }) {
            return models.Post.count()
        },
        async comments(root, _, { models }) {
            return models.Comment.findAll({
                where: { postId: root.id },

                order: [['createdAt', 'DESC']]
            })
        },
        async commentCount(root, _, { models }) {
            return models.Comment.count({ where: { postId: root.id } })
        },
        async likesCount(root, _, { models }) {
            return models.Like.count({ where: { resourceId: root.id } })
        },
        async isLiked(root, _, { user, models }) {

            const isRessourceLiked = await models.Like.count({
                where: {
                    userId: user ? user.userId : "",
                    resourceId: root.id
                }
            });
            return isRessourceLiked === 1;
        },
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
    PostTag: {
        async posts(root, args, { user, models }) {
            return models.Post.findAll({ where: { tagId: root.id } })
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
    // Upload: mutation.GraphQLUpload,
};

module.exports = resolvers;