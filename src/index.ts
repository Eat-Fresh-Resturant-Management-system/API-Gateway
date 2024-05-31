import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import startMenuServer from './gateway/menuServer.js';  // Adjust the path as necessary
import startOrderServer from './gateway/OrderServer.js';

// Start the Menu Management server first
await startMenuServer();
await startOrderServer();

// Function to start the API Gateway server
async function startApiGateway() {
  let gateway;

  try {
    const supergraphSdl = readFileSync('supergraph.graphql', 'utf-16le');

    gateway = new ApolloGateway({
      supergraphSdl
    });
  } catch (err) {
    console.error(err);
  }

  const server = new ApolloServer({ gateway });
  // Start the gateway server
  const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
  console.log(`🚀 API Gateway ready at ${url}`);
}

// Start the API Gateway server after the Menu Management server
startApiGateway();
