import {
    AuthFormWrapper,
    AuthFormWrapperLeftSide,
    AuthFormWrapperRightSide,
} from '../../components/auth-form/AuthFormWrappers.tsx';
import { SplitOrStealGreenLogo } from '../../components/shared/Icons.tsx';
import { ReactNode } from 'react';

type AuthenticationFormWrapperProps = {
    children: ReactNode;
    displayRightSide: boolean;
    hangingText: string;
};

export const AuthenticationFormWrapper = ({
    children,
    displayRightSide,
    hangingText,
}: AuthenticationFormWrapperProps) => {
    return (
        <AuthFormWrapper $hangingText={hangingText}>
            <AuthFormWrapperLeftSide>{children}</AuthFormWrapperLeftSide>
            {displayRightSide && (
                <AuthFormWrapperRightSide>
                    <SplitOrStealGreenLogo $dimension={200} />
                </AuthFormWrapperRightSide>
            )}
        </AuthFormWrapper>
    );
};
