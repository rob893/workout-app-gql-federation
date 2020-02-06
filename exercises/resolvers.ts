import { GraphQLResolverMap } from 'apollo-graphql';
import { Exercise, ExerciseCategory } from "./entities";
import { ExerciseAPI } from "./ExerciseAPI";


export const resolvers: GraphQLResolverMap<any> = {
    Query: {
        async exercises(root, args, { dataSources }): Promise<Exercise[]> {
            const exerciseAPI: ExerciseAPI = dataSources.exerciseAPI;

            const exercises = await exerciseAPI.getExercises();

            return exercises;
        },

        async exercise(root, { id }, { dataSources }): Promise<Exercise | null> {
            const exerciseAPI: ExerciseAPI = dataSources.exerciseAPI;

            const exercise = await exerciseAPI.getExerciseById(id);

            return exercise;
        }
    },
    Exercise: {
        equipment(parent: Exercise) {
            return {
                __typename: 'Equipment',
                id: parent
            };
        }
    },
    ExerciseCategory: {
        async exercises(root: ExerciseCategory, args, { dataSources }): Promise<Exercise[]> {
            const exerciseAPI: ExerciseAPI = dataSources.exerciseAPI;

            const exercises = await exerciseAPI.getExercises();

            const exercisesForCategory = exercises.filter(exercise => exercise.exerciseCategorys.some(category => category.id === root.id));

            return exercisesForCategory;
        }
    }
}