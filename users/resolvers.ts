import { GraphQLResolverMap } from 'apollo-graphql';
import { User, UserToRegister, UserLogin, UserLoginResponse } from "./entities";
import { UserAPI } from './UserAPI';

export const resolvers: GraphQLResolverMap<any> = {
    Query: {
        async users(root, args, { dataSources }): Promise<User[]> {
            const userAPI: UserAPI = dataSources.userAPI;

            const allUsers = await userAPI.getAllUsers();

            return allUsers;
        },

        async user(root, { id }, { dataSources }): Promise<User | null> {
            const userAPI: UserAPI = dataSources.userAPI;

            const user = await userAPI.getUserById(id);

            return user;
        },
    },
    Mutation: {
        async registerUser(root, { user }: { user: UserToRegister }, { dataSources }): Promise<User> {
            const userAPI: UserAPI = dataSources.userAPI;

            const createdUser = await userAPI.registerUser(user);

            return createdUser;
        },

        async login(root, { userCredentials }: { userCredentials: UserLogin }, { dataSources }): Promise<UserLoginResponse> {
            const userAPI: UserAPI = dataSources.userAPI;

            const loginRes = await userAPI.login(userCredentials);

            return loginRes;
        }
    },
}