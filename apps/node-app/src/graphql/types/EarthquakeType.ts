import { gql } from 'graphql-tag'

export default gql`
  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: Date!
  }

  type Query {
    earthquakes: [Earthquake!]!
  }

  type Mutation {
    createEarthquake(location: String!, magnitude: Float!, date: Date!): Earthquake!
    updateEarthquake(id: ID!, location: String, magnitude: Float, date: Date): Earthquake
    deleteEarthquake(id: ID!): Boolean!
  }
`
