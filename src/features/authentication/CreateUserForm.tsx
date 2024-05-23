// @flow
import {
    AuthButton,
    AuthFormField,
    AuthFormFooterText,
    AuthFormInput,
    AuthFormLabel,
} from '../../components/auth-form/AuthFormComponents.tsx';
import { AuthenticationFormWrapper } from './AuthenticationFormWrapper.tsx';
import { useCreateUserMutation } from '../../store/api/authApi.ts';
import React, { useState } from 'react';
import { UserLoginDto } from '../../models/dto/UserLoginDto.ts';
import { activateInfoPopup } from '../../store/slices/infoPopup.slice.ts';
import { useDispatch } from 'react-redux';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';
import { updateCurrentUser } from '../../store/slices/currentUser.slice.ts';
import { TEXT_COLOR_GREEN, TEXT_COLOR_SILVER } from '../../config/Styles.ts';
import { useNavigate } from 'react-router-dom';

export const CreateUserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createUser] = useCreateUserMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isSubmitButtonDisabled = !email || !password;

    const handleCreateUser = async () => {
        const userCreateDto: UserLoginDto = {
            email,
            password,
        };

        const result = await createUser(userCreateDto);

        // @ts-ignore
        if (result.error) {
            const errorMessage =
                // @ts-ignore
                result.error.data.message || 'Error creating user';
            dispatch(
                activateInfoPopup({
                    type: PopupTypes.ERROR,
                    message: errorMessage,
                }),
            );

            setEmail('');
            setPassword('');

            return;
        }

        // @ts-ignore
        dispatch(updateCurrentUser(result.data));
        dispatch(
            activateInfoPopup({
                type: PopupTypes.SUCCESS,
                message: 'User created',
            }),
        );

        navigate('/home');
    };

    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleClickLogIn = () => {
        navigate('/login');
    };

    return (
        <AuthenticationFormWrapper
            displayRightSide={true}
            hangingText="Create user"
        >
            <AuthFormField>
                <AuthFormLabel $color={TEXT_COLOR_GREEN}>
                    Create user using e-mail
                </AuthFormLabel>
                <AuthFormInput onChange={handleOnChangeEmail} value={email} />
            </AuthFormField>
            <AuthFormField>
                <AuthFormLabel $color={TEXT_COLOR_SILVER}>
                    Enter password
                </AuthFormLabel>
                <AuthFormInput
                    type="password"
                    onChange={handleOnChangePassword}
                    value={password}
                />
            </AuthFormField>
            <AuthButton
                disabled={isSubmitButtonDisabled}
                onClick={handleCreateUser}
            >
                Create user
            </AuthButton>
            <AuthFormFooterText onClick={handleClickLogIn}>
                Log in
            </AuthFormFooterText>
        </AuthenticationFormWrapper>
    );
};
