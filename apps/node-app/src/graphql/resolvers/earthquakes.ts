import { Earthquake } from '../../dataSources/EarthquakeDataSource'
import { Context } from '../../main'

export default {
  Query: {
    earthquakes: async (_: unknown , __: Earthquake, { dataSources }: Context) => {
      return dataSources.earthquakeDataSource.getAllEarthquakes()
    },
  },

  Mutation: {
    createEarthquake: async (_: unknown, { location, magnitude, date }:  Earthquake, { dataSources }: Context) => {
      return dataSources.earthquakeDataSource.createEarthquake({ location, magnitude, date })
    },

    updateEarthquake: async (_: unknown, { id, location, magnitude, date }: Earthquake, { dataSources }: Context) => {
      return dataSources.earthquakeDataSource.updateEarthquake(id, { location, magnitude, date })
    },

    deleteEarthquake: async (_: unknown, { id }: Earthquake, { dataSources }: Context) => {
      return dataSources.earthquakeDataSource.deleteEarthquake(id)
    },
  },
}
