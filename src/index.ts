import { ApolloServer } from '@apollo/server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import startMenuServer from './gateway/menuServer.js';  
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
    console.log("loading gateway supergraph");
    const supergraphSdl = readFileSync('supergraph.graphql', 'utf-16le');
    gateway = new ApolloGateway({
      supergraphSdl,
      buildService({ url }) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            // Forward the authorization token from the client request
            if (context.token) {
              request.http.headers.set('authorization', context.token);
            }
          },
        });
      },
    });

    const server = new ApolloServer({
      gateway,
      context: ({ req }) => {
        // Extract the token from the request headers
        const token = req.headers.authorization || '';
        return { token };
      },
    });

    // Start the gateway server
    const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
    console.log(`🚀 API Gateway ready at ${url}`);
  } catch (err) {
    console.error("Error starting API Gateway server:", err);
  }
}

// Start the Menu Management server first, then the API Gateway server
startServers().then(startApiGateway);
