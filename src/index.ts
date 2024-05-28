import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { IntrospectAndCompose } from '@apollo/gateway';

import express from 'express';
import pkg from 'body-parser';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

const { json } = pkg;

const port = process.env.APOLLO_PORT || 5000;
const supergraphSdl =readFileSync('supergraph.graphql', 'utf-16le');


const gateway = new ApolloGateway({ 
  supergraphSdl
});

const server = new ApolloServer({ gateway });

// Note the top-level await!
const { url } = await startStandaloneServer(server, {listen: { port: 4001 } });
console.log(`🚀  Server ready at ${url}`);