import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type TableBooking {
    id: ID!
    tableName: String!
    userName: String!
    bookingDate: String!
    bookingDuration: Int!
    bookingEndTime: String!
    bookingStatus: String!
  }

  type Table {
    tableName: String!
    capacity: Int!
    isAvailable: Boolean!
  }

  type Query {
    getAllTableBookings: [TableBooking!]!
    getAllTables: [Table!]!
    getAvailableTables: [Table!]!
    getTableBookingByUserName(userName: String!): [TableBooking!]!
  }

  type Mutation {
    createTableBooking(tableName: String!, userName: String!, bookingDuration: Int!): TableBooking!
    createTable(tableName: String!, capacity: Int!): Table!
    toggleTableAvailability(tableName: String!): Table!
    deleteTable(tableName: String!): DeleteResponse!
    deleteTableBooking(userName: String!): DeleteResponse!
  }

  type DeleteResponse {
    success: Boolean!
    message: String
  }
`;

export default typeDefs;
