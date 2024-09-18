import { gql, LazyQueryHookOptions, MutationHookOptions, useLazyQuery, useMutation } from '@apollo/client'

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

const CREATE_EARTHQUAKE_MUTATION = gql`
  mutation createEarthquake($location: String!, $magnitude: Float!, $date: Date!) {
    createEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`

const UPDATE_EARTHQUAKE_MUTATION = gql`
  mutation updateEarthquake($id: ID!, $location: String, $magnitude: Float, $date: Date) {
    updateEarthquake(id: $id, location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`

const DELETE_EARTHQUAKE_MUTATION = gql`
  mutation deleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`

// Hooks
export const useEarthquakes = (lazyQueryOptions?: LazyQueryHookOptions) => useLazyQuery(GET_EARTHQUAKES_QUERY, lazyQueryOptions)
export const useCreateEarthquakeMutation = (mutationOptions?: MutationHookOptions) => useMutation(CREATE_EARTHQUAKE_MUTATION, mutationOptions)
export const useUpdateEarthquakeMutation = (mutationOptions?: MutationHookOptions) => useMutation(UPDATE_EARTHQUAKE_MUTATION, mutationOptions)
export const useDeleteEarthquakeMutation = (mutationOptions?: MutationHookOptions) => useMutation(DELETE_EARTHQUAKE_MUTATION, mutationOptions)
