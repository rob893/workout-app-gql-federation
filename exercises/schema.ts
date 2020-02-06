import { gql } from 'apollo-server-azure-functions';

export const typeDefs = gql`
    type Query {
        exercise(id: ID!): Exercise
        exercises: [Exercise]
    }

    type Exercise @key(fields: "id") {
        id: ID!
        name: String!
        primaryMuscle: Muscle @provides(fields: "name")
        secondaryMuscle: Muscle @provides(fields: "name")
        exerciseSteps: [ExerciseStep]
        exerciseCategorys: [ExerciseCategory]
        equipment: [Equipment] @provides(fields: "name")
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
        name: String! @external
    }

    extend type Muscle @key(fields: "id") {
        id: ID! @external
        name: String! @external
    }
`;