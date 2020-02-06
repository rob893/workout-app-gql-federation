import { EquipmentAPI } from "./EquipmentAPI";
import { GraphQLResolverMap } from 'apollo-graphql';
import { Equipment } from "./entities";

export const resolvers: GraphQLResolverMap<any> = {
    Query: {
        async allEquipment(root, args, { dataSources }): Promise<Equipment[]> {
            const equipmentAPI: EquipmentAPI = dataSources.equipmentAPI;

            const equipment = await equipmentAPI.getAllEquipment();

            return equipment;
        },

        async equipment(root, { id }, { dataSources }): Promise<Equipment | null> {
            const equipmentAPI: EquipmentAPI = dataSources.equipmentAPI;

            const equipment = await equipmentAPI.getEquipmentById(id);

            return equipment;
        }
    },
    Equipment: {
        // async exercises(root: Equipment, args, { dataSources }): Promise<Exercise[]> {
        //     const exerciseAPI: ExerciseAPI = dataSources.exerciseAPI;

        //     const exercises = await exerciseAPI.getExercises();

        //     const exercisesForEquipment = exercises.filter(exercise => exercise.equipment.some(equipment => equipment.id === root.id));

        //     return exercisesForEquipment;
        // }
    }
}