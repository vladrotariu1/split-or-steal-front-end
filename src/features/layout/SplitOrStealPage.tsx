import { TEXT_COLOR_SILVER } from '../../config/Styles.ts';
import { Choices } from '../../models/enums/Choices.ts';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    SplitOrStealChoiceButton,
    SplitOrStealTitle,
} from '../../components/split-or-steal/SplitOrStealComponents.tsx';
import {
    SplitOrStealChoicesButtonsWrapper,
    SplitOrStealWrapper,
} from '../../components/split-or-steal/SplitOrStealWrappers.tsx';
import {
    GreenText,
    MoneyPotText,
    RedText,
    CustomText,
    WhiteText,
} from '../../components/shared/Text.tsx';
import {
    PlayerChoiceWrapper,
    ResultsWrapper,
} from '../../components/chat/ChatWrappers.tsx';
import { PlayerChoice } from '../../components/chat/ChatComponents.tsx';
import { getChoiceColor } from '../../utils/Utils.ts';
import { VerticalSeparator } from '../../components/shared/Separators.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { PlayersChoicesResponse } from '../../models/response/PlayersChoicesResponse.ts';
import { updateUserBalance } from '../../store/slices/currentUser.slice.ts';
import { setPlayerState } from '../../store/slices/gameMetadata.slice.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { formatTimer } from '../../utils/Format.ts';
import { LoadingSpinner } from '../../components/shared/Icons.tsx';
import { SocketContext } from '../../context/SocketContext.tsx';

export const SplitOrStealPage = () => {
    const [choice, setChoice] = useState<Choices>(null);
    const [opponentChoice, setOpponentChoice] = useState<Choices>(null);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [userBalance, setUserBalance] = useState(0);

    const { playerState, gamePot } = useSelector(
        (state: RootState) => state.gameMetadata,
    );
    const { userId } = useSelector((state: RootState) => state.currentUser);

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    const handleOnChooseSplit = () => {
        socket.emit('split-or-steal-decision', Choices.SPLIT);
        setChoice(Choices.SPLIT);
    };

    const handleOnChooseSteal = () => {
        socket.emit('split-or-steal-decision', Choices.STEAL);
        setChoice(Choices.STEAL);
    };

    const onSocketStartSplitOrSteal = ({
        roundDuration,
    }: {
        roundDuration: number;
    }) => {
        const roundTimerDuration = Math.floor(roundDuration / 1000);

        setTimerSeconds(roundTimerDuration);

        dispatch(setPlayerState(PlayerStates.IN_SPLIT_OR_STEAL));

        intervalRef.current = setInterval(() => {
            setTimerSeconds((seconds) => (seconds - 1 >= 0 ? seconds - 1 : 0));
        }, 1000);
    };

    const onSocketEndGame = (playerChoices: PlayersChoicesResponse) => {
        console.log('player-choices', playerChoices);
        clearInterval(intervalRef.current);

        if (playerChoices.player1.id === userId) {
            setChoice(playerChoices.player1.choice);
            setOpponentChoice(playerChoices.player2.choice);
            setUserBalance(playerChoices.player1.resultBalance);
            dispatch(updateUserBalance(playerChoices.player1.resultBalance));
        } else {
            setChoice(playerChoices.player2.choice);
            setOpponentChoice(playerChoices.player1.choice);
            setUserBalance(playerChoices.player2.resultBalance);
            dispatch(updateUserBalance(playerChoices.player2.resultBalance));
        }

        dispatch(setPlayerState(PlayerStates.NOT_IN_GAME));
    };

    useEffect(() => {
        if (socket) {
            socket.removeAllListeners('start-split-or-steal');
            socket.removeAllListeners('end-game');
            socket.on('start-split-or-steal', onSocketStartSplitOrSteal);
            socket.on('end-game', onSocketEndGame);
        }
    }, [socket]);

    return (
        <SplitOrStealWrapper>
            <SplitOrStealTitle>
                <GreenText>SPLIT</GreenText> or <RedText>STEAL</RedText>
            </SplitOrStealTitle>
            {/*<WhiteText>*/}
            {/*    Playing against <RedText>test@test.com</RedText>*/}
            {/*</WhiteText>*/}
            {!(playerState === PlayerStates.NOT_IN_GAME) && (
                <MoneyPotText>
                    <GreenText>Money</GreenText> pot is{' '}
                    <GreenText>{gamePot.toFixed(2)}$</GreenText>
                </MoneyPotText>
            )}
            {playerState === PlayerStates.PREPARING_SPLIT_OR_STEAL && (
                <LoadingSpinner $dimension={200} $innerText="PREPARING" />
            )}
            {playerState === PlayerStates.IN_SPLIT_OR_STEAL && (
                <SplitOrStealChoicesButtonsWrapper>
                    <SplitOrStealChoiceButton
                        $choice={Choices.STEAL}
                        $isFocused={choice === Choices.STEAL}
                        onClick={handleOnChooseSteal}
                    >
                        STEAL
                    </SplitOrStealChoiceButton>
                    <CustomText $color={TEXT_COLOR_SILVER} $fontSize={72}>
                        {formatTimer(timerSeconds)}
                    </CustomText>
                    <SplitOrStealChoiceButton
                        $choice={Choices.SPLIT}
                        $isFocused={choice === Choices.SPLIT}
                        onClick={handleOnChooseSplit}
                    >
                        SPLIT
                    </SplitOrStealChoiceButton>
                </SplitOrStealChoicesButtonsWrapper>
            )}
            {playerState === PlayerStates.NOT_IN_GAME && (
                <>
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
                    <WhiteText>
                        Your balance:
                        {userBalance >= 0 ? (
                            <GreenText>+{userBalance.toFixed(2)}$</GreenText>
                        ) : (
                            <RedText>{userBalance.toFixed(2)}$</RedText>
                        )}
                    </WhiteText>
                </>
            )}
        </SplitOrStealWrapper>
    );
};
