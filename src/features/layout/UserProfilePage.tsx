import {
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_YELLOW,
} from '../../config/Styles.ts';
import {
    ProfilePicture,
    ProfilePictureInput,
} from '../../components/shared/ProfilePicture.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { DEFAULT_USER_IMAGE_URL } from '../../config/Variables.ts';
import {
    UserProfileStatsWrapper,
    UserProfileStatWrapper,
    UserProfileWrapper,
} from '../../components/user-profile/UserProfileWrappers.tsx';
import {
    UserProfileDelimiter,
    UserProfileEmail,
    UserProfileStatDescription,
    UserProfileStatValue,
} from '../../components/user-profile/UserProfileComponents.tsx';
import React from 'react';
import {
    useGetUserStatisticsQuery,
    useUpdateProfilePictureMutation,
} from '../../store/api/userProfileApi.ts';
import { activateInfoPopup } from '../../store/slices/infoPopup.slice.ts';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';
import { UpdateProfilePictureResponse } from '../../models/response/UpdateProfilePictureResponse.ts';
import { updateCurrentUser } from '../../store/slices/currentUser.slice.ts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserProfileButton = styled.button`
    background-color: transparent;
    border: 2px solid ${TEXT_COLOR_GREEN};
    border-radius: 8px;
    color: ${TEXT_COLOR_GREEN};
    cursor: pointer;
    padding: 12px 24px;
    text-transform: uppercase;
`;

export const UserProfilePage = () => {
    const { userPhotoUrl, email, userId } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const [updateProfilePicture] = useUpdateProfilePictureMutation();

    const { data } = useGetUserStatisticsQuery(userId, {
        refetchOnMountOrArgChange: true,
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const result = await updateProfilePicture(formData);

        // @ts-ignore
        if (result.error) {
            // @ts-ignore
            const error = result.error;
            console.log(error);
            dispatch(
                activateInfoPopup({
                    type: PopupTypes.ERROR,
                    message: error.data.message || 'Failed to upload image',
                }),
            );

            return;
        }

        const { newProfilePictureUrl } =
            // @ts-ignore
            result.data as UpdateProfilePictureResponse;

        dispatch(updateCurrentUser({ userPhotoUrl: newProfilePictureUrl }));
        dispatch(
            activateInfoPopup({
                type: PopupTypes.SUCCESS,
                message: 'Picture updated',
            }),
        );
    };

    const onClickPaymentMethods = () => {
        navigate('/payment-methods');
    };

    return (
        <UserProfileWrapper>
            <ProfilePicture
                $changePhotoActivated={true}
                $dimension={120}
                $imageUrl={userPhotoUrl || DEFAULT_USER_IMAGE_URL}
            >
                <ProfilePictureInput onChange={handleFileUpload} type="file" />
            </ProfilePicture>
            <UserProfileEmail>{email}</UserProfileEmail>
            <UserProfileDelimiter />
            {data && (
                <UserProfileStatsWrapper>
                    <UserProfileStatWrapper $color={TEXT_COLOR_GREEN}>
                        <UserProfileStatValue>
                            {data.numberOfSteals}
                        </UserProfileStatValue>
                        <UserProfileStatDescription>
                            Steals
                        </UserProfileStatDescription>
                    </UserProfileStatWrapper>
                    <UserProfileStatWrapper $color={TEXT_COLOR_YELLOW}>
                        <UserProfileStatValue>
                            {data.numberOfSplits}
                        </UserProfileStatValue>
                        <UserProfileStatDescription>
                            Splits
                        </UserProfileStatDescription>
                    </UserProfileStatWrapper>
                    <UserProfileStatWrapper $color={TEXT_COLOR_RED}>
                        <UserProfileStatValue>
                            {data.numberOfLoses}
                        </UserProfileStatValue>
                        <UserProfileStatDescription>
                            Loses
                        </UserProfileStatDescription>
                    </UserProfileStatWrapper>
                </UserProfileStatsWrapper>
            )}
            <UserProfileDelimiter />
            <UserProfileButton onClick={onClickPaymentMethods}>
                See payment methods
            </UserProfileButton>
        </UserProfileWrapper>
    );
};
