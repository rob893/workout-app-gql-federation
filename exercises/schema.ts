import { gql } from 'apollo-server-azure-functions';

export const typeDefs = gql`
    type Query {
        exercise(id: ID!): Exercise
        exercises: [Exercise]
    }

    type Exercise {
        id: ID!
        name: String!
        exerciseSteps: [ExerciseStep]
        exerciseCategorys: [ExerciseCategory]
        equipment: [Equipment]
    }

    type ExerciseStep {
        exerciseStepNumber: Int!
        description: String!
    }

    type ExerciseCategory {
        id: ID!
        name: String!
        exercises: [Exercise]
    }

    extend type Equipment @key(fields: "id") {
        id: ID! @external
    }
`;