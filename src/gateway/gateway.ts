import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

export const gateway = new ApolloGateway({
  serviceList: [
    { name: 'TableBookingService', url: 'http://localhost:4000/graphql' }, 
    // { name: 'MenuManagement', url: 'http://localhost:2000/menumanagement' }, 
    // { name: 'AuthService', url: 'http://localhost:3000/login' }, 
    // { name: 'OrdersService', url: 'http://localhost:3500/Orders' },

],
});

const server = new ApolloServer({
  gateway
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
