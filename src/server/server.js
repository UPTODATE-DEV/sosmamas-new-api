const { ApolloServer } = require('apollo-server-express');
// const express = require('express');
// const { createServer } = require('http');
// const cors = require('cors');
// const path = require('path');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const typeDefs = require('./api/graphql/schema');
const resolvers = require('./api/graphql/resolvers');
const models = require('./models/index');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.ACCESS_TOKEN || "somesecretkey")
    }
    return null
  } catch (error) {
    return null
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req) {
      return { user: null, models }
    }
    const token = req.get('authorization') || ''
    const authData = getUser(token.split(' ')[1])
    return { user: authData, models }
  },
  // subscriptions:{
  //   onConnect: (_, ws)=>{
      // console.log(ws)
  //   }
  // },
  // introspection: true,
  // playground: true
});

module.exports = { apolloServer }