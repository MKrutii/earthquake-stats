import { Earthquake } from '../../dataSources/EarthquakeDataSource';

export default {
  Query: {
    earthquakes: async (_: unknown, __: Earthquake, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.getAllEarthquakes()
    },
  },

  Mutation: {
    createEarthquake: async (_: unknown, { location, magnitude, date }: Earthquake, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.createEarthquake({ location, magnitude, date })
    },

    updateEarthquake: async (_: any, { id, location, magnitude, date }: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.updateEarthquake(id, { location, magnitude, date })
    },

    deleteEarthquake: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.deleteEarthquake(id)
    },
  },
}
