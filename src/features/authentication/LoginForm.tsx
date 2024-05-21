// @flow
import {
    AuthButton,
    AuthFormField,
    AuthFormFooterText,
    AuthFormInput,
    AuthFormLabel,
} from '../../components/auth-form/AuthFormComponents.tsx';
import { AuthenticationFormWrapper } from './AuthenticationFormWrapper.tsx';
import { useLoginMutation } from '../../store/api/authApi.ts';
import React, { useState } from 'react';
import { UserLoginDto } from '../../models/dto/UserLoginDto.ts';
import { activateInfoPopup } from '../../store/slices/infoPopup.slice.ts';
import { useDispatch } from 'react-redux';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';
import { updateCurrentUser } from '../../store/slices/currentUser.slice.ts';
import { TEXT_COLOR_GREEN, TEXT_COLOR_SILVER } from '../../utils/Styles.ts';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isSubmitButtonDisabled = !email || !password;

    const handleLogin = async () => {
        const userLoginDetails: UserLoginDto = {
            email,
            password,
        };

        const result = await login(userLoginDetails);

        // @ts-ignore
        if (result.error) {
            // @ts-ignore
            const errorMessage = result.error.data.message || 'Login error';
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
                message: 'Login successful',
            }),
        );

        navigate('/');
    };

    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleClickCreateAccount = () => {
        navigate('/create-user');
    };

    return (
        <AuthenticationFormWrapper
            displayRightSide={true}
            hangingText={'Log in'}
        >
            <AuthFormField>
                <AuthFormLabel $color={TEXT_COLOR_GREEN}>
                    Log in using e-mail
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
            <AuthButton disabled={isSubmitButtonDisabled} onClick={handleLogin}>
                Log in
            </AuthButton>
            <AuthFormFooterText onClick={handleClickCreateAccount}>
                Create an account
            </AuthFormFooterText>
        </AuthenticationFormWrapper>
    );
};
