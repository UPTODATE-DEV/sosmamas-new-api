const jwt = require('jsonwebtoken')
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./api/graphql/schema');
const resolvers = require('./api/graphql/resolvers');
const models = require('./models/index');

const port = 4000;

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, 'somesupersecretkey')
    }
    return null
  } catch (error) {
    return null
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req) {
      return { user: null, models }
    }
    
    const token = req.get('authorization') || ''
    return { user: getUser(token.split(' ')[1]), models }
  },
  // introspection: true,
  // playground: true
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});