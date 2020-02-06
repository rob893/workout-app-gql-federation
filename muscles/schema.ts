import { gql } from 'apollo-server-azure-functions';

export const typeDefs = gql`
    type Query {
        muscles: [Muscle]
        muscle(id: ID!): Muscle
    }

    type Muscle @key(fields: "id") {
        id: ID!
        name: String!
    }
`;