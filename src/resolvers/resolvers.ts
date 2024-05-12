import axios from 'axios';

const TABLE_BOOKING_SERVICE_URL = 'http://localhost:4000'; // Replace '4000' with the port exposed by the TableBookingService container

const resolvers = {
  Query: {
    getAllTableBookings: async () => {
      try {
        const response = await axios.get(`${TABLE_BOOKING_SERVICE_URL}/table-bookings`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch table bookings: ${error.message}`);
      }
    },
    getAllTables: async () => {
      try {
        const response = await axios.get(`${TABLE_BOOKING_SERVICE_URL}/tables`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch table bookings: ${error.message}`);
      }
    },
    // Implement other query resolvers
  },
  Mutation: {
    createTableBooking: async (_, { tableName, userName, bookingDuration }, context) => {
      try {
        const response = await axios.post(`${TABLE_BOOKING_SERVICE_URL}/table-bookings`, {
          tableName,
          userName,
          bookingDuration,
        });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to create table booking: ${error.message}`);
      }
    },


  },
};

export { resolvers };
