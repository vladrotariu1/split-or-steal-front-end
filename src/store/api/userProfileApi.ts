import { userProfileBaseApi } from './baseApi.ts';
import { UpdateProfilePictureResponse } from '../../models/response/UpdateProfilePictureResponse.ts';
import { GameHistoryResponse } from '../../models/response/GameHistoryResponse.ts';
import { Message } from '../../models/Message.ts';

const injectedRtkApi = userProfileBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfilePicture: builder.mutation<
            UpdateProfilePictureResponse,
            FormData
        >({
            query: (formData) => ({
                url: 'user-profile/profile-picture',
                method: 'PUT',
                body: formData,
            }),
        }),
        getUserStatistics: builder.query<
            { numberOfLoses; numberOfSplits; numberOfSteals },
            string
        >({
            query: (userId) => `user-profile/statistics/${userId}`,
        }),
        getGameHistory: builder.query<GameHistoryResponse[], void>({
            query: () => `user-profile/game-history`,
        }),
        getGameMessages: builder.query<Message[], string>({
            query: (gameId) => `user-profile/game-history/${gameId}`,
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as userProfileApi };
export const {
    useGetGameHistoryQuery,
    useGetGameMessagesQuery,
    useGetUserStatisticsQuery,
    useUpdateProfilePictureMutation,
} = injectedRtkApi;
