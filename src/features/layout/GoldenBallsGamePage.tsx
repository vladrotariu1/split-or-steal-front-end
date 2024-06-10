import {
    GoldenBallsGameInfoWrapper,
    GoldenBallsOpponentsWrapper,
    GoldenBallsOpponentsWrapperChild,
    GoldenBallsPlayerSectionWrapper,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import { GoldenBallsPlayerCollection } from '../golden-balls/GoldenBallsPlayerCollection.tsx';
import { LoadingSpinner } from '../../components/shared/Icons.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../context/SocketContext.tsx';
import { GoldenBallsRoundStartResponse } from '../../models/response/GoldenBallsRoundStartResponse.ts';
import {
    setGamePot,
    setNumberOfKillerBalls,
    setPlayerState,
} from '../../store/slices/gameMetadata.slice.ts';
import { GoldenBall } from '../../models/models/GoldenBall.ts';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_USER_IMAGE_URL } from '../../config/Variables.ts';
import { GoldenBallsPlayerCollectionScaffold } from '../golden-balls/GoldenBallsPlayerCollectionScaffold.tsx';
import { RoundTimer } from '../../components/shared/RoundTimer.tsx';
import { TEXT_COLOR_GREEN } from '../../config/Styles.ts';
import { formatTimer } from '../../utils/Format.ts';
import { GoldenBallsAssignment } from '../../models/models/GoldenBallsAssignment.ts';
import { GoldenBallsRoundEndResponse } from '../../models/response/GoldenBallsRoundEndResponse.ts';
import { ChatUserDetailsResponse } from '../../models/response/UserDetailsResponse.ts';
import { GoldenBallsDeclarations } from '../golden-balls/GoldenBallsDeclarations.tsx';
import { activateInfoPopup } from '../../store/slices/infoPopup.slice.ts';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';
import { PrepareSplitOrStealResponse } from '../../models/response/PrepareSplitOrStealResponse.ts';
import {
    GreenText,
    RedText,
    WhiteText,
} from '../../components/shared/Text.tsx';

const getUserShownBalls = (
    userId: string,
    shownBallsArray: {
        playerId: string;
        shownBalls: GoldenBall[];
    }[],
) => shownBallsArray.find((shownBalls) => shownBalls.playerId === userId);

const getUserHiddenBalls = (
    userId: string,
    shownBallsArray: { playerId: string; shownBalls: GoldenBall[] }[],
    userGoldenBalls: GoldenBall[],
) => {
    const userShownBallsIds = getUserShownBalls(
        userId,
        shownBallsArray,
    ).shownBalls.map((ball) => ball.id);

    return userGoldenBalls.filter(
        (goldenBall) => !userShownBallsIds.includes(goldenBall.id),
    );
};

export const GoldenBallsGamePage = () => {
    const [userGoldenBalls, setUserGoldenBalls] = useState<GoldenBall[]>(null);
    const [shownBalls, setShownBalls] = useState<GoldenBallsAssignment[]>(null);
    const [playersGoldenBalls, setPlayersGoldenBalls] =
        useState<{ playerId: string; balls: GoldenBall[] }[]>(null);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [currentUserKickVote, setCurrentUserKickVote] = useState(null);
    const [disableGoldenBallsDeclaration, setDisableGoldenBallsDeclaration] =
        useState(false);
    const [declaredGoldenBalls, setDeclaredGoldenBalls] = useState<{
        [id: string]: GoldenBall[];
    }>({});
    const [killerBallsRemovedBalance, setKillerBallsRemovedBalance] =
        useState(0);

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const { playerState, usersDetails, gamePot, numberOfKillerBalls } =
        useSelector((state: RootState) => state.gameMetadata);
    const {
        email: currentUserEmail,
        userId: currentUserId,
        userName: currentUserName,
        userPhotoUrl: currentUserPhotoUrl,
    } = useSelector((state: RootState) => state.currentUser);

    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();

    const onSocketStartGoldenBallsRound = useCallback(
        (goldenBallsRoundStartResponse: GoldenBallsRoundStartResponse) => {
            const roundTimerDuration = Math.floor(
                goldenBallsRoundStartResponse.roundDuration / 1000,
            );

            dispatch(setPlayerState(PlayerStates.IN_GOLDEN_BALLS_ROUND));
            setUserGoldenBalls(
                goldenBallsRoundStartResponse.userGoldenBallsAssignment,
            );
            setShownBalls(goldenBallsRoundStartResponse.shownBallsAssignments);
            setPlayersGoldenBalls(null);
            setTimerSeconds(roundTimerDuration);
            setDisableGoldenBallsDeclaration(false);

            intervalRef.current = setInterval(() => {
                setTimerSeconds((seconds) =>
                    seconds - 1 >= 0 ? seconds - 1 : 0,
                );
            }, 1000);

            console.log('start-round!!!!', goldenBallsRoundStartResponse);
        },
        [dispatch],
    );

    const onSocketPrepareGoldenBallsRound = useCallback(() => {
        console.log('preparing');
        dispatch(setPlayerState(PlayerStates.PREPARING_GOLDEN_BALLS));
    }, [dispatch]);

    const onSocketEndGoldenBallsRound = useCallback(
        ({
            kickedUserId,
            killerBallsRemained,
            ballsAssignments,
            newRoomPot,
        }: GoldenBallsRoundEndResponse) => {
            clearInterval(intervalRef.current);

            dispatch(setPlayerState(PlayerStates.NOT_IN_GAME));
            dispatch(setNumberOfKillerBalls(killerBallsRemained));
            dispatch(setGamePot(newRoomPot));

            console.log('users balls after the round', ballsAssignments);

            setPlayersGoldenBalls(ballsAssignments);
            setDisableGoldenBallsDeclaration(true);
            setDeclaredGoldenBalls({});

            if (kickedUserId === currentUserId) {
                navigate('/new-game');
            }
        },
        [currentUserId, dispatch, navigate],
    );

    const onUserGoldenBallsDeclaration = ({
        userId,
        goldenBalls,
    }: {
        userId: string;
        goldenBalls: GoldenBall[];
    }) => {
        console.log('user golden balls declaration', {
            userId,
            goldenBalls,
        });
        setDeclaredGoldenBalls((declaredGoldenBalls) => ({
            ...declaredGoldenBalls,
            [userId]: goldenBalls,
        }));
    };

    const onSocketPrepareSplitOrSteal = useCallback(
        (prepareSplitOrStealResponse: PrepareSplitOrStealResponse) => {
            console.log('prepare split or steal', prepareSplitOrStealResponse);
            dispatch(setPlayerState(PlayerStates.PREPARING_SPLIT_OR_STEAL));
            dispatch(
                setNumberOfKillerBalls(
                    prepareSplitOrStealResponse.recalculatedRoomPotObject
                        .killerBallsRemained,
                ),
            );
            dispatch(
                setGamePot(
                    prepareSplitOrStealResponse.recalculatedRoomPotObject
                        .newRoomPot,
                ),
            );

            setKillerBallsRemovedBalance(
                prepareSplitOrStealResponse.recalculatedRoomPotObject
                    .killerBallsRemovedBalance,
            );

            const timeout = setTimeout(() => {
                navigate('/split-or-steal');
                clearTimeout(timeout);
            }, prepareSplitOrStealResponse.preparationDuration / 2);
        },
        [dispatch, navigate],
    );

    useEffect(() => {
        if (socket) {
            socket.removeListener();
            socket.on(
                'start-golden-balls-round',
                onSocketStartGoldenBallsRound,
            );
            socket.on(
                'prepare-golden-balls-round',
                onSocketPrepareGoldenBallsRound,
            );
            socket.on('end-golden-balls-round', onSocketEndGoldenBallsRound);
            socket.on(
                'user-golden-balls-declaration',
                onUserGoldenBallsDeclaration,
            );
            socket.on('prepare-split-or-steal', onSocketPrepareSplitOrSteal);
        }
    }, [
        onSocketEndGoldenBallsRound,
        onSocketPrepareGoldenBallsRound,
        onSocketPrepareSplitOrSteal,
        onSocketStartGoldenBallsRound,
        socket,
    ]);

    const handleKickUserCallback = (userId: string) => () => {
        socket.emit('golden-balls-kick-decision', userId);
        setCurrentUserKickVote(userId);
    };

    const handleGoldenBallsDeclaration = (ballValues: number[]) => {
        const declaredGoldenBalls = ballValues.map(
            (value) => ({ id: crypto.randomUUID(), value }) as GoldenBall,
        );

        socket.emit('declare-golden-balls-value', declaredGoldenBalls);
        setDisableGoldenBallsDeclaration(true);
        dispatch(
            activateInfoPopup({
                message: 'Balls declared to other players',
                type: PopupTypes.SUCCESS,
            }),
        );
    };

    const generateGoldenBallsPlayerCollectionProperties = (
        user: ChatUserDetailsResponse,
    ) => {
        let componentProperties = {
            handleKickUser: handleKickUserCallback(user.userId),
            hiddenBalls: declaredGoldenBalls[user.userId] || undefined,
            shownBalls: getUserShownBalls(user.userId, shownBalls).shownBalls,
            userName: user.userName,
            userPhoto: user.userPhotoUrl || DEFAULT_USER_IMAGE_URL,
        };

        if (playersGoldenBalls) {
            const playerGoldenBalls = playersGoldenBalls.find(
                (playerGoldenBalls) =>
                    playerGoldenBalls.playerId === user.userId,
            );
            componentProperties = {
                ...componentProperties,
                hiddenBalls: getUserHiddenBalls(
                    user.userId,
                    shownBalls,
                    playerGoldenBalls.balls,
                ),
            };
        }

        return componentProperties;
    };

    const isPreparingNewRound =
        playerState === PlayerStates.PREPARING_GOLDEN_BALLS;
    const isPreparingSplitOrSteal =
        playerState === PlayerStates.PREPARING_SPLIT_OR_STEAL;
    const isInRound = playerState === PlayerStates.IN_GOLDEN_BALLS_ROUND;

    let userShownBallsToComponentsMapping = [];

    if (shownBalls) {
        userShownBallsToComponentsMapping = usersDetails
            .filter((usersDetails) => usersDetails.userId !== currentUserId)
            .map((userDetails) => (
                <GoldenBallsPlayerCollection
                    enableKickButton={true}
                    isUerKickVoted={userDetails.userId === currentUserKickVote}
                    showHiddenBalls={!isInRound}
                    {...generateGoldenBallsPlayerCollectionProperties(
                        userDetails,
                    )}
                />
            ));
    }

    return shownBalls ? (
        <>
            <GoldenBallsOpponentsWrapper>
                <GoldenBallsOpponentsWrapperChild>
                    {userShownBallsToComponentsMapping[0] || (
                        <GoldenBallsPlayerCollectionScaffold />
                    )}
                    {userShownBallsToComponentsMapping[1] || (
                        <GoldenBallsPlayerCollectionScaffold />
                    )}
                </GoldenBallsOpponentsWrapperChild>
                <GoldenBallsOpponentsWrapperChild>
                    {userShownBallsToComponentsMapping[2] || (
                        <GoldenBallsPlayerCollectionScaffold />
                    )}
                    <GoldenBallsGameInfoWrapper>
                        <WhiteText>
                            <RedText>KILLER</RedText> balls:{' '}
                            <RedText>{numberOfKillerBalls}</RedText>
                        </WhiteText>
                        {isPreparingSplitOrSteal && (
                            <WhiteText>
                                <RedText>Removed</RedText> killer balls balance:{' '}
                                <RedText>
                                    {killerBallsRemovedBalance?.toFixed(2)}$
                                </RedText>
                            </WhiteText>
                        )}
                        <WhiteText>
                            Game pot:
                            <GreenText>{gamePot.toFixed(2)}$</GreenText>
                        </WhiteText>
                        {(isPreparingNewRound || isPreparingSplitOrSteal) && (
                            <LoadingSpinner
                                $dimension={200}
                                $innerText="PREPARING"
                            />
                        )}
                        {isInRound && (
                            <RoundTimer
                                $color={TEXT_COLOR_GREEN}
                                $fontSize={72}
                            >
                                {formatTimer(timerSeconds)}
                            </RoundTimer>
                        )}
                    </GoldenBallsGameInfoWrapper>
                    {userShownBallsToComponentsMapping[3] || (
                        <GoldenBallsPlayerCollectionScaffold />
                    )}
                </GoldenBallsOpponentsWrapperChild>
            </GoldenBallsOpponentsWrapper>

            <GoldenBallsPlayerSectionWrapper>
                <GoldenBallsPlayerCollection
                    enableKickButton={false}
                    showHiddenBalls={true}
                    userName={currentUserName || currentUserEmail}
                    userPhoto={currentUserPhotoUrl || DEFAULT_USER_IMAGE_URL}
                    hiddenBalls={getUserHiddenBalls(
                        currentUserId,
                        shownBalls,
                        userGoldenBalls,
                    )}
                    shownBalls={
                        getUserShownBalls(currentUserId, shownBalls).shownBalls
                    }
                />
                {isInRound && (
                    <GoldenBallsDeclarations
                        declarationDisabled={disableGoldenBallsDeclaration}
                        numberOfBalls={3}
                        onCLickSendGoldenBallsDeclarations={
                            handleGoldenBallsDeclaration
                        }
                    />
                )}
            </GoldenBallsPlayerSectionWrapper>
        </>
    ) : (
        <LoadingSpinner $dimension={200} $innerText="PREPARING ROUND" />
    );
};
