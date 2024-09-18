import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { EarthquakeDataSource } from './dataSources/EarthquakeDataSource'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types/typeDefs'

export interface Context {
  dataSources: {
    earthquakeDataSource: EarthquakeDataSource
  }
}

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_NAME = process.env.MONGODB_NAME

const earthquakeDataSource = new EarthquakeDataSource(MONGODB_URI, MONGODB_NAME)
const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function startApolloServer() {
  await earthquakeDataSource.initialize()

  try {
    await server.start()
  } catch (e) {
    console.error(e || 'Something went wrong while starting server')
  }

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        dataSources: {
          earthquakeDataSource
        },
      }),
    })
  )

  httpServer.listen({ port: PORT,  }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
  })
}

startApolloServer()
