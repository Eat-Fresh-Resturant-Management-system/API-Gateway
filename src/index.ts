import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";

// Import the gateway instance created in gateway.ts
import { gateway } from "./gateway/gateway.js";

const PORT = process.env.PORT || 4000;
const app = express();

async function startServer() {
  const server = new ApolloServer({
    gateway,
  });

  await server.start();

  // Apply middleware to the Express server
  server.applyMiddleware({ app });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err.message);
});
