import { MainSection } from './components/layout/MainSection.tsx';
import { Navbar } from './features/layout/Navbar.tsx';
import { LoginForm } from './features/authentication/LoginForm.tsx';
import { InfoPopup } from './features/layout/InfoPopup.tsx';
import { UserProfilePage } from './features/layout/UserProfilePage.tsx';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './features/layout/HomePage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.ts';
import { CreateUserForm } from './features/authentication/CreateUserForm.tsx';
import { PaymentMethods } from './features/payment-methods/PaymentMethods.tsx';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from './config/Variables.ts';
import { useLoginWithTokenMutation } from './store/api/authApi.ts';
import { useEffect } from 'react';
import { NewGamePage } from './features/layout/NewGamePage.tsx';
import { PaymentsReturnPage } from './features/layout/PaymentsReturnPage.tsx';

function App() {
    const { accessToken, loggedIn } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [logInWithToken] = useLoginWithTokenMutation();
    const navigate = useNavigate();

    if (accessToken) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    }

    console.log('rerendering app');

    useEffect(() => {
        const cachedAccessToken = localStorage.getItem(
            LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        );

        const onLoginError = () => {
            navigate('/login');
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        };

        if (cachedAccessToken && !loggedIn) {
            logInWithToken({
                authToken: cachedAccessToken,
                errorCallback: onLoginError,
            });
        }
    }, [logInWithToken, loggedIn, navigate]);

    return (
        <>
            <Navbar />
            <MainSection>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route
                        path="create-user"
                        element={
                            !loggedIn ? <CreateUserForm /> : <Navigate to="/" />
                        }
                    />
                    <Route path="new-game" element={<NewGamePage />} />
                    <Route
                        path="profile"
                        element={
                            loggedIn ? (
                                <UserProfilePage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="payment-methods"
                        element={
                            loggedIn ? (
                                <PaymentMethods />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="payments-return"
                        element={<PaymentsReturnPage />}
                    />
                    <Route path="not-found" element={<div>Error</div>} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </MainSection>
            <InfoPopup />
        </>
    );
}

export default App;
