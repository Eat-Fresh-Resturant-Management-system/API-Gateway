import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import express from 'express';
import pkg from 'body-parser';

const { json } = pkg;
let gateway;

try 
{
  const supergraphSdl =readFileSync('supergraph.graphql', 'utf-16le');

  gateway = new ApolloGateway({ 
    supergraphSdl
  });
}
catch (err) {
  console.error(err);
}



const server = new ApolloServer({ gateway });

// Note the top-level await!
const { url } = await startStandaloneServer(server, {listen: { port: 5000 } });
console.log(`🚀  Server ready at ${url}`);