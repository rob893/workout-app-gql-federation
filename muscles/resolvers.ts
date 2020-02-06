import { GraphQLResolverMap } from 'apollo-graphql';
import { Muscle } from "./entities";
import { MuscleAPI } from "./MuscleAPI";


export const resolvers: GraphQLResolverMap<{ dataSources: { muscleAPI: MuscleAPI } }> = {
    Query: {

        muscles(root, args, { dataSources }): Promise<Muscle[]> {
            return dataSources.muscleAPI.getMuscles();
        },

        muscle(root, { id }, { dataSources }): Promise<Muscle | null> {
            return dataSources.muscleAPI.getMuscleById(id);
        }
    },
    Muscle: {
        __resolveReference({ id }, { dataSources: { muscleAPI } }): Promise<Muscle> {
            return muscleAPI.getMuscleById(id);
        },
        // async exercises(root: Muscle, args, { dataSources }): Promise<Exercise[]> {
        //     const exerciseAPI: ExerciseAPI = dataSources.exerciseAPI;

        //     const exercises = await exerciseAPI.getExercises();

        //     const exercisesForMuscle = exercises.filter(exercise => {
        //         if (exercise.secondaryMuscle) {
        //             return exercise.primaryMuscle.id === root.id || exercise.secondaryMuscle.id === root.id;
        //         }

        //         return exercise.primaryMuscle.id === root.id;
        //     });

        //     return exercisesForMuscle;
        // }
    }
}