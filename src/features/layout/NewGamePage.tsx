import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import {
    ChatTimer,
    OpponentName,
    PlayerChoice,
    StartNewGameButton,
} from '../../components/chat/ChatComponents.tsx';
import {
    ChatMetadataWrapper,
    ChatWrapper,
    PlayerChoiceWrapper,
    PlayingAgainstWrapper,
    ResultsWrapper,
} from '../../components/chat/ChatWrappers.tsx';
import { Message } from '../../models/Message.ts';
import {
    CHAT_USERNAME_RED,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_YELLOW,
} from '../../config/Styles.ts';
import { io } from 'socket.io-client';
import { getCurrentServiceEndpoint } from '../../config/ServiceEndpointsMap.ts';
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
import { StartGameResponse } from '../../models/response/StartGameResponse.ts';
import { formatTimer } from '../../utils/Format.ts';
import { VerticalSeparator } from '../../components/shared/Separators.tsx';
import {
    computeOutcome,
    getChoiceColor,
    getOutcomeColor,
} from '../../utils/Utils.ts';
import { GameOutcomes } from '../../models/enums/GameOutcomes.ts';

export const NewGamePage = () => {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([] as Message[]);
    const [playerState, setPlayerState] = useState(PlayerStates.NOT_IN_GAME);
    const [choice, setChoice] = useState<Choices>(null);
    const [opponentChoice, setOpponentChoice] = useState<Choices>(null);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [wrapperBoxShadow, setWrapperBoxShadow] = useState<string>(null);
    const [gameOutcome, setGameOutcome] = useState<GameOutcomes>(null);

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>(null);

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
        const chatTimerDuration = Math.floor(
            startGameResponse.chatDuration / 1000,
        );

        setWrapperBoxShadow(null);
        setTimerSeconds(() => chatTimerDuration);
        setPlayerState(PlayerStates.IN_GAME);

        intervalRef.current = setInterval(() => {
            setTimerSeconds((seconds) => (seconds - 1 >= 0 ? seconds - 1 : 0));
        }, 1000);
    };

    const onSocketEndGame = (playerChoices: PlayersChoicesResponse) => {
        console.log('player-choices', playerChoices);
        let outcome;

        if (playerChoices.player1.id === userId) {
            setChoice(playerChoices.player1.choice);
            setOpponentChoice(playerChoices.player2.choice);
            outcome = computeOutcome(
                playerChoices.player1.choice,
                playerChoices.player2.choice,
            );
        } else {
            setChoice(playerChoices.player2.choice);
            setOpponentChoice(playerChoices.player1.choice);
            outcome = computeOutcome(
                playerChoices.player2.choice,
                playerChoices.player1.choice,
            );
        }

        clearInterval(intervalRef.current);

        setWrapperBoxShadow(null);
        setPlayerState(PlayerStates.DISPLAY_RESULTS);
        setGameOutcome(outcome);

        const timeout = setTimeout(() => {
            clearInterval(timeout);
            setWrapperBoxShadow(getOutcomeColor(outcome));
            console.log(gameOutcome);
        }, 1000);
    };

    const clearSocket = () => {
        socket.removeListener();
        socket.disconnect();
    };

    const handleOnBackArrow = () => {
        clearSocket();
        setChoice(null);
        setOpponentChoice(null);
        setMessage('');
        setMessagesList([]);
        setPlayerState(PlayerStates.NOT_IN_GAME);
        setGameOutcome(null);
        setWrapperBoxShadow(null);
    };

    const handleOnClose = () => {
        clearSocket();
        setPlayerState(PlayerStates.NOT_IN_GAME);
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

    const handleOnChooseSplit = () => {
        socket.emit('split-or-steal-decision', Choices.SPLIT);
        setChoice(Choices.SPLIT);
        setWrapperBoxShadow(TEXT_COLOR_YELLOW);
    };

    const handleOnChooseSteal = () => {
        socket.emit('split-or-steal-decision', Choices.STEAL);
        setChoice(Choices.STEAL);
        setWrapperBoxShadow(TEXT_COLOR_GREEN);
    };

    const handleSearchNewGameClick = () => {
        setPlayerState(PlayerStates.SEARCHING_FOR_GAME);
        setWrapperBoxShadow(TEXT_COLOR_GREEN);

        socket.connect();

        socket.on('connect', onSocketConnect);
        socket.on('disconnect', onSocketDisconnect);
        socket.on('message', onSocketMessage);
        socket.on('start-game', onSocketStartGame);
        socket.on('end-game', onSocketEndGame);
    };

    const textPlaceholder = `Type your message${!loggedIn ? ' (please login 🔒)' : ' ✏️'}`;

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
                    <TopRightPositionedWrapper>
                        <ChatTimer $color={TEXT_COLOR_GREEN}>
                            {formatTimer(timerSeconds)}
                        </ChatTimer>
                    </TopRightPositionedWrapper>

                    <ChatMetadataWrapper>
                        <PlayingAgainstWrapper>
                            Playing with
                        </PlayingAgainstWrapper>
                        <OpponentName $color={CHAT_USERNAME_RED}>
                            somee@name123467
                        </OpponentName>
                    </ChatMetadataWrapper>

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
                    <TopLeftPositionedWrapper>
                        <BackArrow
                            onClick={handleOnBackArrow}
                            $dimension={24}
                        />
                    </TopLeftPositionedWrapper>

                    <ResultsWrapper>
                        <PlayerChoiceWrapper>
                            You chose:
                            <PlayerChoice $color={getChoiceColor(choice)}>
                                {choice}
                            </PlayerChoice>
                        </PlayerChoiceWrapper>
                        <VerticalSeparator />
                        <PlayerChoiceWrapper>
                            Opponent chose:
                            <PlayerChoice
                                $color={getChoiceColor(opponentChoice)}
                            >
                                {opponentChoice}
                            </PlayerChoice>
                        </PlayerChoiceWrapper>
                    </ResultsWrapper>
                </>
            )}
        </ChatWrapper>
    );
};
