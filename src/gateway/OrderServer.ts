import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'apollo-server-express';
import { orderResolvers } from '../resolvers/orderResolvers.js';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
// Load type definitions from the schema file
console.log('Loading Order schema file');

const typeDefs = gql`
  type schema {
    query: Query
    mutation: Mutation
  }

  # Define the Order type
  type Order {
    OrderId: ID!
    CustomerId: Int!
    OrderTime: String!
    Status: String!
  }

  # Define the OrderItem type
  type OrderItem {
    OrderItemId: ID!
    Quantity: Int!
    Price: Float!
  }

  # Define the TableData type
  type TableData {
    Id: ID!
    IsAvailable: String!
  }

  # Define the Query type
  type Query {
    getOrderItems: [OrderItem]
    getOrderItem(id: ID!): OrderItem
    getOrders: [Order]
    getOrder(id: ID!): Order
    getTableDatas: [TableData]
    getTableData(id: ID!): TableData
  }

  # Define the Mutation type
  type Mutation {
    createOrderItem(orderItem: OrderItemInput!): OrderItem
    updateOrderItem(id: ID!, orderItem: OrderItemInput!): OrderItem
    deleteOrderItem(id: ID!): SuccessMessage
    createOrder(order: OrderInput!): Order
    updateOrder(id: ID!, order: OrderInput!): Order
    deleteOrder(id: ID!): SuccessMessage
    createTableData(tableData: TableDataInput!): TableData
    updateTableData(id: ID!, tableData: TableDataInput!): TableData
    deleteTableData(id: ID!): SuccessMessage
  }

  input OrderItemInput {
    Quantity: Int!
    Price: Float!
  }

  input OrderInput {
    CustomerId: Int!
    OrderTime: String!
    Status: String!
  }

  input TableDataInput {
    IsAvailable: String!
  }

  type SuccessMessage {
    success: Boolean!
  }
`;

const app = express();

const jwtCheck = auth({
  audience: 'https://swwao.orbit.au.dk/grp-13',
  issuerBaseURL: 'https://dev-feeu3ze3mjv64zbn.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Enforce JWT authentication on all endpoints
app.use(jwtCheck);


const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: orderResolvers })
});

// Function to start the server
async function startOrderServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(express.json());
  app.listen(4002, () => {
    console.log("Order QL Server Is Ready");
  });
}

export default startOrderServer;
