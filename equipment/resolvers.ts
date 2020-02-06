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
        __resolveReference({ id }, { dataSources: { equipmentAPI } }: { dataSources: { equipmentAPI: EquipmentAPI } }): Promise<Equipment> {
            return equipmentAPI.getEquipmentById(id);
        },
        // exercises(root: Equipment, args, { dataSources }) {
        //     return {
        //         __typename: 'Exercise',
        //         id: root.id
        //     };
        // }
    }
}