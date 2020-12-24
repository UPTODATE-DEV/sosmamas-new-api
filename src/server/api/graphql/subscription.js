const { withFilter } = require('apollo-server');
const { pubsub, NEW_PERIODE } = require('./constants');
module.exports = () => ({
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
        // newPost: {
        //     subscribe: withFilter(
        //         () => pubsub.asyncIterator([NEW_POST]),
        //         (payload, args) => {
        //             return true
        //         },
        //     ),
        //     resolve: (payload) => (payload.newPost)
        // },
    }
})