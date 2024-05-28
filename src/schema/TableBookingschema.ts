import { gql } from 'apollo-server';

const typeDefs = gql`
  type TableBooking @key(fields: "id") {
    id: ID!
    userName: String!
    tableName: String!
    bookingDate: String!
    bookingDuration: Int!
    bookingStatus: String!
  }

  type Query {
    getAllTableBookings: [TableBooking]
    getAllTables: [Table]
    getAvailableTables: [Table]
    getTableBookingByUserName(userName: String!): [TableBooking]
  }

  type Mutation {
    createTableBooking(tableName: String!, userName: String!, bookingDuration: Int!): TableBooking
    createTable(tableName: String!, capacity: Int!): Table
    toggleTableAvailability(tableName: String!): Table
    deleteTableBooking(userName: String!): TableBooking
    deleteTable(tableName: String!): Table
  }
`;

export default typeDefs;
