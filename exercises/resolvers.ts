import { GraphQLResolverMap } from 'apollo-graphql';
import { Exercise, ExerciseCategory } from "./entities";
import { ExerciseAPI } from "./ExerciseAPI";


export const resolvers: GraphQLResolverMap<{ dataSources: { exerciseAPI: ExerciseAPI } }> = {
    Query: {
        exercises(root, args, { dataSources }): Promise<Exercise[]> {
            return dataSources.exerciseAPI.getExercises();
        },

        exercise(root, { id }, { dataSources }): Promise<Exercise | null> {
            return dataSources.exerciseAPI.getExerciseById(id);
        }
    },
    Exercise: {
        equipment(parent: Exercise) {
            return parent.equipment.map(e => {
                return {
                    __typename: 'Equipment',
                    id: e.id,
                    name: e.name
                }
            });
        },
        
        primaryMuscle(parent: Exercise) {
            return {
                __typename: 'Muscle',
                id: parent.primaryMuscle.id,
                name: parent.primaryMuscle.name
            };
        },

        secondaryMuscle(parent: Exercise) {
            return parent.secondaryMuscle ? {
                __typename: 'Muscle',
                id: parent.secondaryMuscle.id,
                name: parent.secondaryMuscle.name
            } : null;
        },
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