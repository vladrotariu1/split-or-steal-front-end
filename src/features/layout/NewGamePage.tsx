import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import {
    ChatTimer,
    StartNewGameButton,
} from '../../components/chat/ChatComponents.tsx';
import { ChatWrapper } from '../../components/chat/ChatWrappers.tsx';
import { Message } from '../../models/Message.ts';
import { TEXT_COLOR_GREEN, TEXT_COLOR_YELLOW } from '../../utils/Styles.ts';
import { io } from 'socket.io-client';
import { getCurrentServiceEndpoint } from '../../utils/ServiceEndpointsMap.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { Choices } from '../../models/enums/Choices.ts';
import { PlayersChoicesResponse } from '../../models/response/PlayersChoicesResponse.ts';
import { ChatMessageList } from '../chat/ChatMessageList.tsx';
import { ChatMessageInput } from '../chat/ChatMessageInput.tsx';
import {
    BackArrow,
    CloseIcon,
    LoadingSpinner,
} from '../../components/shared/Icons.tsx';
import {
    TopLeftPositionedWrapper,
    TopRightPositionedWrapper,
} from '../../components/shared/Wrappers.tsx';

export const NewGamePage = () => {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([] as Message[]);
    const [playerState, setPlayerState] = useState(
        PlayerStates.DISPLAY_RESULTS,
    );
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
        console.log('new-message');
        setMessagesList((msgList) => [...msgList, message]);
    }

    function onSocketStartGame() {
        setPlayerState(PlayerStates.IN_GAME);
    }

    function onSocketEndGame(playerChoices: PlayersChoicesResponse) {
        console.log('player-choices', playerChoices);
        setPlayerState(PlayerStates.DISPLAY_RESULTS);
    }

    const clearSocket = () => {
        socket.removeListener();
        socket.disconnect();
    };

    const handleOnBackArrow = () => {
        clearSocket();
        setChoice(null);
        setMessage('');
        setMessagesList([]);
        setPlayerState(PlayerStates.NOT_IN_GAME);
    };

    const handleOnClose = () => {
        clearSocket();
        setPlayerState(PlayerStates.NOT_IN_GAME);
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
                    <TopLeftPositionedWrapper>
                        <CloseIcon onClick={handleOnClose} $dimension={24} />
                    </TopLeftPositionedWrapper>
                    <LoadingSpinner $dimension={240} $innerText={'SEARCHING'} />
                </>
            )}
            {playerState === PlayerStates.IN_GAME && (
                <>
                    <ChatMessageList
                        currentUserId={userId}
                        messagesList={messagesList}
                    />

                    <ChatMessageInput
                        displaySplitOrSteal={
                            playerState === PlayerStates.IN_GAME
                        }
                        handleOnChooseSplit={handleOnChooseSplit}
                        handleOnChooseSteal={handleOnChooseSteal}
                        handleOnInputChange={handleOnInputChange}
                        handleOnKeyPress={handleOnKeyPress}
                        inputDisabled={!loggedIn}
                        inputTextPlaceholder={textPlaceholder}
                        inputValue={message}
                    />
                </>
            )}
            {playerState === PlayerStates.DISPLAY_RESULTS && (
                <>
                    <TopRightPositionedWrapper>
                        <ChatTimer $color={TEXT_COLOR_GREEN}>02:04</ChatTimer>
                    </TopRightPositionedWrapper>

                    <TopLeftPositionedWrapper>
                        <BackArrow
                            onClick={handleOnBackArrow}
                            $dimension={24}
                        />
                    </TopLeftPositionedWrapper>
                    <ChatMessageList
                        currentUserId={userId}
                        messagesList={messagesList}
                    />
                </>
            )}
        </ChatWrapper>
    );
};
