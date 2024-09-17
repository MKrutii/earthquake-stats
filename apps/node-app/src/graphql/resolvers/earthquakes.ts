export default {
  Query: {
    earthquakes: async (_: unknown, __: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.getAllEarthquakes();
    },
  },

  Mutation: {
    createEarthquake: async (_: any, { location, magnitude, date }: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.createEarthquake({ location, magnitude, date });
    },

    updateEarthquake: async (_: any, { id, location, magnitude, date }: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.updateEarthquake(id, { location, magnitude, date });
    },

    deleteEarthquake: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.earthquakeDataSource.deleteEarthquake(id);
    },
  },
};
