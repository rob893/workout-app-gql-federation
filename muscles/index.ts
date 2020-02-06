import { ApolloServer } from 'apollo-server-azure-functions';
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { MuscleAPI } from './MuscleAPI';

const server = new ApolloServer({
    context: ({ request }) => {
        return {
            token: request.headers.authorization || request.headers.Authorization || ''
        };
    },
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
        muscleAPI: new MuscleAPI()
    })
});

export default server.createHandler();