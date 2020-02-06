import { ApolloServer } from 'apollo-server-azure-functions';
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { EquipmentAPI } from './EquipmentAPI';

const server = new ApolloServer({
    context: ({ request }) => {
        return {
            token: request.headers.authorization || request.headers.Authorization || ''
        };
    },
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
        equipmentAPI: new EquipmentAPI()
    })
});

export default server.createHandler();