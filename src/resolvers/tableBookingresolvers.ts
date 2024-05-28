const tableBookingResolvers = {
  Query: {
    getAllTableBookings: async (_source, _args, { dataSources }) => {
      return dataSources.tableBookingAPI.getTableBookings();
    },
    getAllTables: async (_source, _args, { dataSources }) => {
      return dataSources.tableBookingAPI.getTables();
    },
    getAvailableTables: async (_source, _args, { dataSources }) => {
      return dataSources.tableBookingAPI.getAvailableTables();
    },
    getTableBookingByUserName: async (_source, { userName }, { dataSources }) => {
      return dataSources.tableBookingAPI.getTableBookingByUserName(userName);
    },
  },
  Mutation: {
    createTableBooking: async (_source, { tableName, userName, bookingDuration }, { dataSources }) => {
      return dataSources.tableBookingAPI.createTableBooking({ tableName, userName, bookingDuration });
    },
    createTable: async (_source, { tableName, capacity }, { dataSources }) => {
      return dataSources.tableBookingAPI.createTable({ tableName, capacity });
    },
    toggleTableAvailability: async (_source, { tableName }, { dataSources }) => {
      return dataSources.tableBookingAPI.toggleTableAvailability(tableName);
    },
    deleteTableBooking: async (_source, { userName }, { dataSources }) => {
      return dataSources.tableBookingAPI.deleteTableBookingByUserName(userName);
    },
    deleteTable: async (_source, { tableName }, { dataSources }) => {
      return dataSources.tableBookingAPI.deleteTable(tableName);
    },
  },
};

export default tableBookingResolvers;
