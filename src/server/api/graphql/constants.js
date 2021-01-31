const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub();

const NEW_PERIODE = 'NEW_PERIODE';
const NEW_POST = 'NEW_POST';
const NEW_COMMENT = 'NEW_COMMENT';
const SEARCH_POST = 'SEARCH_POST';

module.exports = { pubsub, NEW_PERIODE, NEW_POST, NEW_COMMENT, SEARCH_POST };
