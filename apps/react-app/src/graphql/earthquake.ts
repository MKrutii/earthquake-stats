import { gql } from '@apollo/client';

export const GET_EARTHQUAKES_QUERY = gql`
  query getEarthquakes {
    earthquakes {
      id
      location
      magnitude
      date
    }
  }
`
