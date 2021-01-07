const { apolloServer } = require('./src/server/server');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();
apolloServer.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(bodyParser.json());

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