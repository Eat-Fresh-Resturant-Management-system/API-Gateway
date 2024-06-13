// import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql, ApolloServer} from 'apollo-server-express';
import { menuResolvers } from '../resolvers/menuResolvers.js';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

// Load type definitions from the schema file
console.log('Loading Menu schema file');

const typeDefs = gql`

  type MenuCategory {
    MenuCategoryName: String!
    Description: String
    MenuItems: [MenuItem]
  }

  type MenuItem {
    ItemId: Int!
    Name: String!
    Description: String
    Price: Float!
    Category: MenuCategory
  }

  type Query {
    menuItems: [MenuItem]
    menuItem(id: Int!): MenuItem
    menuCategories: [MenuCategory]
    menuCategoryByName(name: String!): MenuCategory
    menuItemsForCategory(categoryId: String!): [MenuItem]
  }

  type Mutation {
    createMenuCategory(menuCategory: MenuCategoryInput!): MenuCategory
    deleteMenuCategory(name: String!): SuccessMessage
    createMenuItem(menuItem: MenuItemInput!): MenuItem
    deleteMenuItem(id: Int!): SuccessMessage
  }

  input MenuCategoryInput {
    MenuCategoryName: String!
    Description: String
  }

  input MenuItemInput {
    Name: String!
    Description: String
    Price: Float!
    Category: String!
  }

  type SuccessMessage {
    success: Boolean!
  }

`;





// Create the Apollo server
// const typeDefs = gql(readFileSync('src/schemas/menuSchema.graphql', 'utf-16le' ));

const app = express();

const jwtCheck = auth({
  audience: 'https://swwao.orbit.au.dk/grp-13',
  issuerBaseURL: 'https://dev-feeu3ze3mjv64zbn.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Enforce JWT authentication on all endpoints
app.use(jwtCheck);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: menuResolvers })
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    return { token };
  }
});

// Function to start the server
async function startMenuServer() {
  await server.start();
  server.applyMiddleware({app});
  app.use(express.json());
  app.listen(4001,()=> {
    console.log("Menu QL Server Is Ready")
  });
}

export default startMenuServer;
