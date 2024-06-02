import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import startMenuServer from './gateway/menuServer.js';  // Adjust the path as necessary
import startOrderServer from './gateway/OrderServer.js';

// Function to start the Menu Management server
async function startServers() {
  try {
    await startMenuServer();
    await startOrderServer();
  } catch (err) {
    console.error("Error starting menu or order server:", err);
    process.exit(1); // Exit the process if the menu or order server fails to start
  }
}

// Function to start the API Gateway server
async function startApiGateway() {
  let gateway;

  try {
    const supergraphSdl = readFileSync('supergraph.graphql', 'utf-16le');
    gateway = new ApolloGateway({
      supergraphSdl
    });

    const server = new ApolloServer({ gateway });
    // Start the gateway server
    const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
    console.log(`🚀 API Gateway ready at ${url}`);
  } catch (err) {
    console.error("Error starting API Gateway server:", err);
  }
}

// Start the Menu Management server first, then the API Gateway server
startServers().then(startApiGateway);