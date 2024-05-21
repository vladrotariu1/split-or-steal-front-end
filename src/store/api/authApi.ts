import { authBaseApi } from './baseApi.ts';
import { UserLoginDto } from '../../models/dto/UserLoginDto.ts';
import { UserDetailsResponse } from '../../models/response/UserDetailsResponse.ts';
import { UserCreateDto } from '../../models/dto/UserCreateDto.ts';
import { updateCurrentUser } from '../slices/currentUser.slice.ts';

const injectedRtkApi = authBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserDetailsResponse, UserLoginDto>({
            query: (userLoginDto) => ({
                url: 'auth/login',
                method: 'POST',
                body: userLoginDto,
            }),
        }),
        loginWithToken: builder.mutation<UserDetailsResponse, string>({
            query: (authToken) => ({
                url: 'auth/login-with-token',
                method: 'POST',
                body: { authToken },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: userDetails } = await queryFulfilled;
                    console.log('setting current user');
                    dispatch(updateCurrentUser(userDetails));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        createUser: builder.mutation<UserDetailsResponse, UserCreateDto>({
            query: (userLoginDto) => ({
                url: 'auth/create-user',
                method: 'POST',
                body: userLoginDto,
            }),
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as authApi };
export const {
    useLoginMutation,
    useCreateUserMutation,
    useLoginWithTokenMutation,
} = injectedRtkApi;
