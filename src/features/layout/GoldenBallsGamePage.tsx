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
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { SocketContext } from '../../context/SocketContext.tsx';
import { GoldenBallsRoundStartResponse } from '../../models/response/GoldenBallsRoundStartResponse.ts';
import {
    addMessageToList,
    setGamePot,
    setNumberOfKillerBalls,
    setPlayerState,
    setTimerSeconds,
} from '../../store/slices/gameMetadata.slice.ts';
import { GoldenBall } from '../../models/models/GoldenBall.ts';
import { useNavigate } from 'react-router-dom';
import {
    AI_ASSISTANT_IMAGE_URL,
    DEFAULT_USER_IMAGE_URL,
} from '../../config/Variables.ts';
import { GoldenBallsPlayerCollectionScaffold } from '../golden-balls/GoldenBallsPlayerCollectionScaffold.tsx';
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
import { RoundTimer } from '../shared/RoundTimer.tsx';
import {
    useGoldenBallsDeclarationAdviceMutation,
    useUserToKickAdviceMutation,
} from '../../store/api/assistantApi.ts';
import { AssistantAdviceStatus } from '../../models/enums/AssistantAdviceStatus.ts';
import { Message } from '../../models/models/Message.ts';

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
    const [currentUserKickVote, setCurrentUserKickVote] = useState(null);
    const [disableGoldenBallsDeclaration, setDisableGoldenBallsDeclaration] =
        useState(false);
    const [declaredGoldenBalls, setDeclaredGoldenBalls] = useState<{
        [id: string]: GoldenBall[];
    }>({});
    const [killerBallsRemovedBalance, setKillerBallsRemovedBalance] =
        useState(0);
    const [kickedUsers, setKickedUsers] = useState<string[]>([]);
    const [kickedUser, setKickedUser] = useState<string>(null);
    const [assistantAdviceStatus, setAssistantAdviceStatus] =
        useState<AssistantAdviceStatus>(AssistantAdviceStatus.NO_ADVICE_NEEDED);

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const { playerState, usersDetails, gamePot, numberOfKillerBalls } =
        useSelector((state: RootState) => state.gameMetadata);
    const {
        email: currentUserEmail,
        userId: currentUserId,
        userName: currentUserName,
        userPhotoUrl: currentUserPhotoUrl,
        isBot,
    } = useSelector((state: RootState) => state.currentUser);

    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();

    const [requestUserToKick] = useUserToKickAdviceMutation();
    const [requestGoldenBalldDeclarationAdvice] =
        useGoldenBallsDeclarationAdviceMutation();

    const userToKickAdviceShownBallsDto = useMemo(
        () =>
            shownBalls
                ?.filter(
                    (goldenBalls) => goldenBalls.playerId !== currentUserId,
                )
                ?.map((goldenBalls) => ({
                    playerId: goldenBalls.playerId,
                    shownGoldenBalls: goldenBalls?.shownBalls?.map(
                        (balls) => balls.value,
                    ),
                })),
        [currentUserId, shownBalls],
    );

    useEffect(() => {
        if (
            isBot &&
            playerState === PlayerStates.IN_GOLDEN_BALLS_ROUND &&
            userToKickAdviceShownBallsDto &&
            gamePot
        ) {
            switch (assistantAdviceStatus) {
                case AssistantAdviceStatus.WAITING_FOR_GOLDEN_BALLS_DECLARATION_ADVICE:
                    console.log('requesting golden balls to display advice');
                    requestGoldenBalldDeclarationAdvice({
                        roomPot: gamePot,
                        displayedBallsValues: getUserShownBalls(
                            currentUserId,
                            shownBalls,
                        ).shownBalls.map((ball) => ball.value),
                        hiddenBallsValues: getUserHiddenBalls(
                            currentUserId,
                            shownBalls,
                            userGoldenBalls,
                        ).map((ball) => ball.value),
                    });
                    break;
                case AssistantAdviceStatus.WAITING_FOR_USER_TO_KICK_ADVICE:
                    console.log('requesting user to kick advice');
                    requestUserToKick({
                        roomPot: gamePot,
                        goldenBallsAssignments: userToKickAdviceShownBallsDto,
                    });
                    break;
            }
        }
    }, [
        assistantAdviceStatus,
        gamePot,
        isBot,
        // playerState,
        requestUserToKick,
        userToKickAdviceShownBallsDto,
    ]);

    const onSocketStartGoldenBallsRound = useCallback(
        (goldenBallsRoundStartResponse: GoldenBallsRoundStartResponse) => {
            const roundTimerDuration = Math.floor(
                goldenBallsRoundStartResponse.roundDuration / 1000,
            );

            setUserGoldenBalls(
                goldenBallsRoundStartResponse.userGoldenBallsAssignment,
            );
            setShownBalls(goldenBallsRoundStartResponse.shownBallsAssignments);
            setPlayersGoldenBalls(null);
            setDisableGoldenBallsDeclaration(false);
            if (kickedUser) {
                setKickedUsers((kickedUsers) => [...kickedUsers, kickedUser]);
            }

            if (isBot) {
                setAssistantAdviceStatus(
                    AssistantAdviceStatus.WAITING_FOR_GOLDEN_BALLS_DECLARATION_ADVICE,
                );
            }

            dispatch(setTimerSeconds(roundTimerDuration));
            dispatch(setPlayerState(PlayerStates.IN_GOLDEN_BALLS_ROUND));
            dispatch(setTimerSeconds(roundTimerDuration));

            console.log('start-round!!!!', goldenBallsRoundStartResponse);
        },
        [dispatch, isBot, kickedUser],
    );

    const onSocketPrepareGoldenBallsRound = useCallback(() => {
        console.log('preparing');
        dispatch(setPlayerState(PlayerStates.PREPARING_GOLDEN_BALLS));
        setAssistantAdviceStatus(
            AssistantAdviceStatus.WAITING_FOR_USER_TO_KICK_ADVICE,
        );
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
            dispatch(setTimerSeconds(null));

            console.log('users balls after the round', ballsAssignments);

            setPlayersGoldenBalls(ballsAssignments);
            setDisableGoldenBallsDeclaration(true);
            setDeclaredGoldenBalls({});
            setKickedUser(kickedUserId);

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

    const onSocketKickUserAdvice = (response) => {
        console.log('Kick advice response: ', response);
        handleKickUserCallback(response?.userId)();

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            userId: 'ai-assistant',
            userName: 'AI Game Assistant',
            userProfilePictureUrl: AI_ASSISTANT_IMAGE_URL,
            text: response?.reason,
        };

        dispatch(addMessageToList(assistantMessage));

        console.log('Kick reason: ', response?.reason);
    };

    const onSocketGoldenBallsToDisplayAdvice = (response: {
        inDanger: boolean;
        lieChoiceReason: string;
        shouldLie: boolean;
        values: number[];
    }) => {
        console.log('Balls to display advice', response);
        handleGoldenBallsDeclaration(response.values);
        setAssistantAdviceStatus(
            AssistantAdviceStatus.WAITING_FOR_USER_TO_KICK_ADVICE,
        );

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            userId: 'ai-assistant',
            userName: 'AI Game Assistant',
            userProfilePictureUrl: AI_ASSISTANT_IMAGE_URL,
            text: response.lieChoiceReason,
        };

        dispatch(addMessageToList(assistantMessage));
    };

    useEffect(() => {
        if (socket) {
            socket.removeAllListeners('start-golden-balls-round');
            socket.removeAllListeners('prepare-golden-balls-round');
            socket.removeAllListeners('end-golden-balls-round');
            socket.removeAllListeners('user-golden-balls-declaration');
            socket.removeAllListeners('prepare-split-or-steal');
            socket.removeAllListeners('user-to-kick-advice');
            socket.removeAllListeners('golden-balls-declaration-advice');

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

            if (isBot) {
                socket.on('user-to-kick-advice', onSocketKickUserAdvice);
                socket.on(
                    'golden-balls-declaration-advice',
                    onSocketGoldenBallsToDisplayAdvice,
                );
            }
        }
    }, [
        isBot,
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
            shownBalls: getUserShownBalls(user.userId, shownBalls)?.shownBalls,
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
            .map((userDetails) =>
                !kickedUsers.includes(userDetails.userId) ? (
                    <GoldenBallsPlayerCollection
                        enableKickButton={true}
                        isUserKicked={userDetails.userId === kickedUser}
                        isUerKickVoted={
                            userDetails.userId === currentUserKickVote
                        }
                        showHiddenBalls={!isInRound}
                        {...generateGoldenBallsPlayerCollectionProperties(
                            userDetails,
                        )}
                    />
                ) : (
                    <GoldenBallsPlayerCollectionScaffold />
                ),
            );
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
                        {isInRound && <RoundTimer />}
                    </GoldenBallsGameInfoWrapper>
                    {userShownBallsToComponentsMapping[3] || (
                        <GoldenBallsPlayerCollectionScaffold />
                    )}
                </GoldenBallsOpponentsWrapperChild>
            </GoldenBallsOpponentsWrapper>

            <GoldenBallsPlayerSectionWrapper>
                <GoldenBallsPlayerCollection
                    isUserKicked={false}
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
