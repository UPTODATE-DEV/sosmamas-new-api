const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const typeDefs = require('./src/server/api/graphql/schema');
const resolvers = require('./src/server/api/graphql/resolvers');
const models = require('./src/server/models/index');

const port = 4000;

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.ACCESS_TOKEN)
    }
    return null
  } catch (error) {
    return null
  }
};

const server = new ApolloServer({
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
//   introspection: true,
//   playground: true
});


server.listen({ port: port }, (url) => {
  console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
});