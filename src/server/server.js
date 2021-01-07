const { ApolloServer } = require('apollo-server-express');
// const express = require('express');
// const { createServer } = require('http');
// const cors = require('cors');
// const path = require('path');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const typeDefs = require('./api/graphql/schema');
const resolvers = require('./api/graphql/resolvers');
const models = require('./models/index');

// const PORT = process.env.PORT || 4000;

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

// const app = express();
// apolloServer.applyMiddleware({ app });

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// app.use(bodyParser.json());

// const httpServer = createServer(app);
// apolloServer.installSubscriptionHandlers(httpServer, {
//   options: {
//     reconnect: true,
//   }
// });

// httpServer.listen({ port: PORT }, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
// })

module.exports = { apolloServer }