const { withFilter } = require('apollo-server-express');
const { NEW_PERIODE } = require('./constants');
module.exports = () => ({
    newPeriode:
        // subscribe: (root, args, { pubsub }) => {
        //     return pubsub.asyncIterator(NEW_PERIODE + args.newPeriode.id)
        //   },
        withFilter(
            () => pubsub.asyncIterator([NEW_PERIODE]),
            (payload, args) => {
                return true
            },
        ),
    resolve: (payload) => (payload.newPeriode)
    ,
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
})