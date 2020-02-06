import { gql } from 'apollo-server-azure-functions';

export const typeDefs = gql`
    type Query {
        allEquipment: [Equipment]
        equipment(id: ID!): Equipment
    }

    type Equipment @key(fields: "id") {
        id: ID!
        name: String!
    }
`;