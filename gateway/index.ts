import { ApolloServer } from 'apollo-server-azure-functions';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('authorization', context.token);
    }
}

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://localhost:7072/users' },
        { name: 'equipment', url: 'http://localhost:7072/equipment' },
        { name: 'exercises', url: 'http://localhost:7072/exercises' }
    ],
    buildService({ url }) {
        return new AuthenticatedDataSource({ url });
    }
});

const server = new ApolloServer({
    gateway,
    context: ({ request }) => {
        return {
            token: request.headers.authorization || request.headers.Authorization || ''
        };
    },
    subscriptions: false,
});

export default server.createHandler();