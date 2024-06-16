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
import React, { useEffect, useState } from 'react';
import { NewGamePage } from './features/layout/NewGamePage.tsx';
import { PaymentsReturnPage } from './features/layout/PaymentsReturnPage.tsx';
import { AddCreditPage } from './features/layout/AddCreditPage.tsx';
import { GameHistoryPage } from './features/layout/GameHistoryPage.tsx';
import { GameDetailsPage } from './features/layout/GameDetailsPage.tsx';
import { Socket } from 'socket.io-client';
import { SocketContext } from './context/SocketContext.tsx';
import { GoldenBallsGamePage } from './features/layout/GoldenBallsGamePage.tsx';
import { SplitOrStealPage } from './features/layout/SplitOrStealPage.tsx';
import { PlayerStates } from './models/enums/PlayerStates.ts';
import { Chat } from './features/chat/Chat.tsx';
import { SetUserAsBot } from './features/layout/SetUserAsBot.tsx';

function App() {
    const { accessToken, loggedIn, isBot } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { playerState } = useSelector(
        (state: RootState) => state.gameMetadata,
    );

    const [logInWithToken] = useLoginWithTokenMutation();
    const [socket, setSocket] = useState<Socket>(null);

    const navigate = useNavigate();

    if (accessToken) {
        console.log('setting-access-token');
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    }

    console.log('rerendering app');

    useEffect(() => {
        const cachedAccessToken = localStorage.getItem(
            LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        );

        const onLoginError = () => {
            window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
            navigate('/login');
        };

        if (cachedAccessToken && !loggedIn) {
            logInWithToken({
                authToken: cachedAccessToken,
                errorCallback: onLoginError,
            });
        }
    }, [logInWithToken, loggedIn, navigate]);

    const displayMessageChat = !(
        playerState === PlayerStates.NOT_IN_GAME ||
        playerState === PlayerStates.END_SPLIT_OR_STEAL ||
        playerState === PlayerStates.WAITING_FOR_GOLDEN_BALLS ||
        playerState === PlayerStates.IN_GAME ||
        playerState === PlayerStates.SEARCHING_FOR_GAME
    );

    const handleOnMainSectionClick = (e: React.MouseEvent) => {
        console.log('clicked in main section');
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket,
            }}
        >
            <Navbar />
            {displayMessageChat && <Chat />}
            <MainSection
                onClick={handleOnMainSectionClick}
                $disableMouseEvents={
                    isBot &&
                    playerState !== PlayerStates.NOT_IN_GAME &&
                    playerState !== PlayerStates.SEARCHING_FOR_GAME
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="set-user-as-bot" element={<SetUserAsBot />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route
                        path="create-user"
                        element={
                            !loggedIn ? <CreateUserForm /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="new-game"
                        element={
                            loggedIn ? (
                                <NewGamePage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="golden-balls-round"
                        element={<GoldenBallsGamePage />}
                    />
                    <Route
                        path="split-or-steal"
                        element={<SplitOrStealPage />}
                    />
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
                        path="game-details/:id"
                        element={<GameDetailsPage />}
                    />
                    <Route path="game-history" element={<GameHistoryPage />} />
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
                        path="add-credit"
                        element={
                            loggedIn ? (
                                <AddCreditPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="payments-return"
                        element={loggedIn && <PaymentsReturnPage />}
                    />
                    <Route path="not-found" element={<div>Error</div>} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </MainSection>
            <InfoPopup />
        </SocketContext.Provider>
    );
}

export default App;
