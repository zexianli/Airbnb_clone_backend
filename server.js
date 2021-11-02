const express = require('express');
const morgan = require('morgan');
const api = require('./api');
const { connectToDB } = require('./lib/mongo');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const router = require('./api');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(express.json());
  app.use(morgan('dev'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use('/', api);

  app.use('*', (req, res, next) => {
    res.send('Hello World!');
  });

  connectToDB(async () => {
    app.listen(port, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}`,
        `\n`,
        `🚀 Graphql ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  });
}

startApolloServer(typeDefs, resolvers);
