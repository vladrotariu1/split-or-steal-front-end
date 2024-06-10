import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { StartNewGameButton } from '../../components/chat/ChatComponents.tsx';
import {
    ChatMetadataWrapper,
    ChatWrapper,
    PlayingAgainstWrapper,
} from '../../components/chat/ChatWrappers.tsx';
import { Message } from '../../models/models/Message.ts';
import { TEXT_COLOR_GREEN } from '../../config/Styles.ts';
import { io } from 'socket.io-client';
import { getCurrentServiceEndpoint } from '../../config/ServiceEndpointsMap.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { ChatMessageList } from '../chat/ChatMessageList.tsx';
import { ChatMessageInput } from '../chat/ChatMessageInput.tsx';
import {
    BackArrow,
    CloseIcon,
    LoadingSpinner,
} from '../../components/shared/Icons.tsx';
import { TopLeftPositionedWrapper } from '../../components/shared/Wrappers.tsx';
import { StartGameResponse } from '../../models/response/StartGameResponse.ts';
import { SocketContext } from '../../context/SocketContext.tsx';
import {
    setChatUsersDetails,
    setGamePot,
    setNumberOfKillerBalls,
    setPlayerState,
} from '../../store/slices/gameMetadata.slice.ts';
import { useNavigate } from 'react-router-dom';

export const NewGamePage = () => {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([] as Message[]);
    const [wrapperBoxShadow, setWrapperBoxShadow] = useState<string>(null);

    const { accessToken, loggedIn, userId } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { playerState } = useSelector(
        (state: RootState) => state.gameMetadata,
    );

    const dispatch = useDispatch();

    const { socket, setSocket } = useContext(SocketContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            const socket = io(getCurrentServiceEndpoint(), {
                autoConnect: false,
                extraHeaders: {
                    Authorization: accessToken,
                },
            });
            setSocket(socket);
        }
    }, [accessToken, setSocket]);

    const onSocketConnect = () => {
        console.log('connected');
    };

    const onSocketDisconnect = () => {
        console.log('disconnected');
    };

    const onSocketMessage = (message: Message) => {
        console.log('new-message');
        setMessagesList((msgList) => [...msgList, message]);
    };

    const onSocketStartGame = (startGameResponse: StartGameResponse) => {
        dispatch(setGamePot(startGameResponse.roomPot));
        dispatch(setChatUsersDetails(startGameResponse.usersDetails));
        dispatch(setNumberOfKillerBalls(startGameResponse.numberOfKillerBalls));
        dispatch(setPlayerState(PlayerStates.WAITING_FOR_GOLDEN_BALLS));

        setWrapperBoxShadow(null);
    };

    const onSocketPrepareGoldenBallsRound = () => {
        dispatch(setPlayerState(PlayerStates.PREPARING_GOLDEN_BALLS));
        navigate('/golden-balls-round');
    };

    const clearSocket = () => {
        socket.removeListener();
        socket.disconnect();
    };

    const handleOnClose = () => {
        socket.disconnect();
        clearSocket();
        dispatch(setPlayerState(PlayerStates.NOT_IN_GAME));
        setWrapperBoxShadow(null);
    };

    const handleOnInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMessage(event.target.value);
    };

    const handleOnKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (message && event.key === 'Enter') {
            socket.emit('message', message);

            setMessage('');
        }
    };

    const handleSearchNewGameClick = () => {
        dispatch(setPlayerState(PlayerStates.SEARCHING_FOR_GAME));
        setWrapperBoxShadow(TEXT_COLOR_GREEN);

        socket.connect();

        socket.on('connect', onSocketConnect);
        socket.on('disconnect', onSocketDisconnect);
        socket.on('message', onSocketMessage);
        socket.on(
            'prepare-golden-balls-round',
            onSocketPrepareGoldenBallsRound,
        );
        socket.on('start-game', onSocketStartGame);
    };

    const textPlaceholder = `Type your message${!loggedIn ? ' (please login 🔒)' : ' ✏️'}`;

    return (
        <>
            <ChatWrapper
                $boxShadow={wrapperBoxShadow}
                $startAnimation={
                    playerState === PlayerStates.SEARCHING_FOR_GAME
                }
            >
                {playerState === PlayerStates.NOT_IN_GAME && (
                    <>
                        <StartNewGameButton onClick={handleSearchNewGameClick}>
                            Start new game
                        </StartNewGameButton>
                    </>
                )}
                {playerState === PlayerStates.SEARCHING_FOR_GAME && (
                    <>
                        <TopLeftPositionedWrapper>
                            <CloseIcon
                                onClick={handleOnClose}
                                $dimension={24}
                            />
                        </TopLeftPositionedWrapper>
                        <LoadingSpinner
                            $dimension={240}
                            $innerText={'SEARCHING'}
                        />
                    </>
                )}
            </ChatWrapper>
        </>
    );
};
