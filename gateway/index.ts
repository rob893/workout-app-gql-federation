import { ApolloServer } from 'apollo-server-azure-functions';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('authorization', context.token);
    }
}

const rootUrl = 'https://rherber-gql-gateway.azurewebsites.net/';

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: `${rootUrl}/users` },
        { name: 'equipment', url: `${rootUrl}/equipment` },
        { name: 'exercises', url: `${rootUrl}/exercises` },
        { name: 'muscles', url: `${rootUrl}/muscles` }
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