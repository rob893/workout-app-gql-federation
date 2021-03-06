import { ApolloServer } from 'apollo-server-azure-functions';
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { UserAPI } from './UserAPI';

const server = new ApolloServer({
    context: ({ request }) => {
        return {
            token: request.headers.authorization || request.headers.Authorization || ''
        };
    },
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
        userAPI: new UserAPI()
    })
});

export default server.createHandler();