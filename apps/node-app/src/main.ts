import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

interface Context {
  token?: string;
}

const port = process.env.PORT || 4000
const app = express()
const httpServer = http.createServer(app);
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startApolloServer() {
  try {
    await server.start();
  } catch (e) {
    console.error(e || 'Something went wrong while starting ApolloServer');
  }

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  app.use('/graphql', express.json(), expressMiddleware(server));

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  })
}

startApolloServer();
