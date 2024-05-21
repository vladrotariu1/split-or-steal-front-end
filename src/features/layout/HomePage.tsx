import { ChatMessage } from '../chat/ChatMessage.tsx';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import {
    ChatMessageInput,
    SplitOrStealIcon,
    StartNewGameButton,
} from '../../components/chat/ChatComponents.tsx';
import {
    ChatMessageInputWrapper,
    ChatMessageListWrapper,
    ChatWrapper,
    SplitOrStealChoiceWrapper,
} from '../../components/chat/ChatWrappers.tsx';
import { Message } from '../../models/Message.ts';
import {
    CHAT_USERNAME_RED,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_YELLOW,
} from '../../utils/Styles.ts';
import { io } from 'socket.io-client';
import { getCurrentServiceEndpoint } from '../../utils/ServiceEndpointsMap.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { Choices } from '../../models/enums/Choices.ts';

export const HomePage = () => {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([] as Message[]);
    const [playerState, setPlayerState] = useState(PlayerStates.NOT_IN_GAME);
    const [choice, setChoice] = useState<Choices>(null);

    const { accessToken, loggedIn, userId } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const serviceEndpoint = getCurrentServiceEndpoint();

    const socket = useMemo(
        () =>
            io(serviceEndpoint, {
                autoConnect: false,
                extraHeaders: {
                    Authorization: accessToken,
                },
            }),
        [accessToken, serviceEndpoint],
    );

    function onSocketConnect() {
        console.log('connected');
    }

    function onSocketDisconnect() {
        console.log('disconnected');
    }

    function onSocketMessage(message: Message) {
        setMessagesList((msgList) => [...msgList, message]);
    }

    function onSocketStartGame() {
        setPlayerState(PlayerStates.IN_GAME);
    }

    function onSocketEndGame() {
        setChoice(null);
        setMessage('');
        setMessagesList([]);
        setPlayerState(PlayerStates.NOT_IN_GAME);
        clearSocket();
    }

    const clearSocket = () => {
        socket.off('connect', onSocketConnect);
        socket.off('disconnect', onSocketDisconnect);
        socket.off('message', onSocketMessage);
        socket.off('start-game', onSocketStartGame);
        socket.off('end-game', onSocketEndGame);

        // socket.disconnect();
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleOnChooseSplit = () => {
        socket.emit('split-or-steal-decision', Choices.SPLIT);
        setChoice(Choices.SPLIT);
    };

    const handleOnChooseSteal = () => {
        socket.emit('split-or-steal-decision', Choices.STEAL);
        setChoice(Choices.STEAL);
    };

    const handleSearchNewGameClick = () => {
        setPlayerState(PlayerStates.SEARCHING_FOR_GAME);

        socket.connect();

        socket.on('connect', onSocketConnect);
        socket.on('disconnect', onSocketDisconnect);
        socket.on('message', onSocketMessage);
        socket.on('start-game', onSocketStartGame);
        socket.on('end-game', onSocketEndGame);
    };

    const textPlaceholder = `Type your message${!loggedIn ? ' (please login 🔒)' : ' ✏️'}`;
    let wrapperBoxShadow =
        choice &&
        (choice === Choices.STEAL ? TEXT_COLOR_GREEN : TEXT_COLOR_YELLOW);

    if (playerState === PlayerStates.SEARCHING_FOR_GAME) {
        wrapperBoxShadow = TEXT_COLOR_GREEN;
    }

    return (
        <ChatWrapper
            $boxShadow={wrapperBoxShadow}
            $startAnimation={playerState === PlayerStates.SEARCHING_FOR_GAME}
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
                    <StartNewGameButton>Searching...</StartNewGameButton>
                </>
            )}
            {playerState === PlayerStates.IN_GAME && (
                <>
                    <ChatMessageListWrapper>
                        {messagesList.map((message) => (
                            <ChatMessage
                                key={message.id}
                                imageUrl={message.userProfilePictureUrl}
                                userName={message.userName}
                                userNameColor={
                                    message.userId === userId
                                        ? TEXT_COLOR_GREEN
                                        : CHAT_USERNAME_RED
                                }
                                text={message.text}
                            />
                        ))}
                    </ChatMessageListWrapper>

                    <ChatMessageInputWrapper>
                        <ChatMessageInput
                            onChange={handleOnChange}
                            onKeyPress={handleOnKeyPress}
                            placeholder={textPlaceholder}
                            type="text"
                            value={message}
                            disabled={!loggedIn}
                        />
                        {loggedIn && (
                            <SplitOrStealChoiceWrapper>
                                <SplitOrStealIcon
                                    onClick={handleOnChooseSplit}
                                    $color={TEXT_COLOR_YELLOW}
                                >
                                    Split
                                </SplitOrStealIcon>
                                <SplitOrStealIcon
                                    onClick={handleOnChooseSteal}
                                    $color={TEXT_COLOR_GREEN}
                                >
                                    Steal
                                </SplitOrStealIcon>
                            </SplitOrStealChoiceWrapper>
                        )}
                    </ChatMessageInputWrapper>
                </>
            )}
        </ChatWrapper>
    );
};
