import { userProfileBaseApi } from './baseApi.ts';
import { UpdateProfilePictureResponse } from '../../models/response/UpdateProfilePictureResponse.ts';

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
    }),
    overrideExisting: false,
});

export { injectedRtkApi as userProfileApi };
export const { useUpdateProfilePictureMutation } = injectedRtkApi;
