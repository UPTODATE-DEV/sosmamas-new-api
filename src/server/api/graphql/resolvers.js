const { withFilter } = require('apollo-server-express');
const TimeAgo = require('javascript-time-ago');
const fr = require('javascript-time-ago/locale/fr');
const sequelize = require('sequelize');
// const Op = sequelize.Op;

TimeAgo.addLocale(fr)
TimeAgo.addDefaultLocale(fr)
const timeAgo = new TimeAgo('fr-FR')
const numeral = require('numeral');

const mutation = require('./mutation');
const query = require('./query');
const { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT, SEARCH_POST } = require('./constants');

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
            resolve: async (payload, args, { connection }) => {
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
        searchPost: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(SEARCH_POST),
                async (_, __) => {
                    return true;
                },
            ),
            resolve: (payload) => (payload.postResult)

        },
    },
    Query: query,
    Mutation: mutation,
    Periode: {
        async symptomes(root, _, { models }) {
            return models.Symptome.findAll({ where: { periodeId: root.id } })
        },
    },
    ConseilItem: {
        async conseil(root, _, { models }) {
            return models.Conseil.findOne({ where: { id: root.conseilId } })
        },
        async periode(root, _, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Conseil: {
        async items(root, args, { models }) {

            return models.ConseilItem.findAll({
                where: {
                    conseilId: root.id,
                    periodeId: args.periodeId
                }
            })
        }
    },
    Symptome: {
        async periode(root, _, { models }) {
            return models.Periode.findOne({ where: { id: root.periodeId } })
        }
    },
    Post: {
        async author(root, _, { user, models }) {
            return models.User.findByPk(root.authorId)
        },
        async tag(root, _, { models }) {
            return models.PostTag.findOne({ where: { id: root.tagId } })
        },
        async comments(root, _, { models }) {
            return models.Comment.findAll({
                where: { postId: root.id },
                attributes: [`id`, `content`, `userId`, `postId`, `status`, `createdAt`, `updatedAt`],
                order: [['createdAt', 'DESC']]
            })
        },
        async commentCount(root, _, { models }) {
            let count = await models.Comment.count({ where: { postId: root.id } });
            const formatedCout = numeral(count).format(count < 1000 ? '0a' : '0.0a');
            return formatedCout;
        },
        async verifiedcomment(root, _, { models }) {
            let count = await models.Comment.count({
                include: {
                    model: models.User,
                    required: true,
                    include: [{
                        model: models.Profile,
                        where: {
                            isVerified: true
                        },
                    }]

                },
                where: { postId: root.id }
            });

            const formatedCout = numeral(count).format(count < 1000 ? '0a' : '0.0a');
            return formatedCout;
        },
        async likesCount(root, _, { models }) {
            const count = await models.Like.count({ where: { resourceId: root.id } });
            const formatedCout = numeral(count).format(count < 1000 ? '0a' : '0.0a');
            return formatedCout;
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
        async timeAgo(root) {
            const time = timeAgo.format(root.createdAt)
            return time;
        },
    },
    Comment: {
        async post(_, args, { models }) {
            return models.Post.findByPk(args.postId, {
                attributes: [`id`, `title`, `body`, `tagId`, `authorId`, `status`, `createdAt`, `updatedAt`],
            })
        },
        async author(root, _, { models }) {
            return models.User.findByPk(root.userId)
        },
        async timeAgo(root) {
            const time = timeAgo.format(root.createdAt)
            return time;
        },
    },
    PostTag: {
        async posts(root, args, { user, models }) {
            return models.Post.findAll({ where: { tagId: root.id } })
        },
    },
    Dashboard: {
        async usercount(_, __, { models }) {
            return await models.User.count()
        },
        async postcount(_, __, { models }) {
            return await models.Post.count()
        },
        async symptomecount(_, __, { models }) {
            return await models.Symptome.count()
        },
        async periodecount(_, __, { models }) {
            return await models.Periode.count()
        },
        async conseilcount(_, __, { models }) {
            return await models.ConseilItem.count()
        },
    },
    AuthData: {
        async user(root, args, { models }) {
            return models.User.findOne({ where: { id: root.userId } })
        },
    },
    User: {
        async profile(root, args, { user, models }) {
            return await models.Profile.findOne({
                attributes: [`id`, `firstName`, `lastName`, `name`, `gender`, `userId`, `isVerified`, `avatar`, `address`, `createdAt`, `updatedAt`],
                where: { userId: root.id } 
            })
        },
    },
};

module.exports = resolvers;