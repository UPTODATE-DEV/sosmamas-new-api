require('dotenv').config();
const { apolloServer } = require('./src/server/server');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');
// const { graphqlUploadExpress } = require('graphql-upload');
const appRoutes = require('./src/server/router/router');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(cors());
app.use(bodyParser.json());

// app.use(
//   '/graphql',
//   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
//   // graphqlHTTP({ schema })
// );
app.use("/graphql", appRoutes);

apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer, {
  options: {
    reconnect: true, 
  }
});

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})