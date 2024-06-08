import {
    GoldenBallsGameInfoWrapper,
    GoldenBallsOpponentsWrapper,
    GoldenBallsOpponentsWrapperChild,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import { GoldenBallsPlayerCollection } from '../golden-balls/GoldenBallsPlayerCollection.tsx';
import { LoadingSpinner } from '../../components/shared/Icons.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext.tsx';
import { GoldenBallsRoundStartResponse } from '../../models/response/GoldenBallsRoundStartResponse.ts';
import { setPlayerState } from '../../store/slices/gameMetadata.slice.ts';
import { GoldenBall } from '../../models/models/GoldenBall.ts';
import { useNavigate } from 'react-router-dom';

const getUserShownBalls = (
    userId: string,
    shownBallsArray: {
        playerId: string;
        shownBalls: GoldenBall[];
    }[],
) => shownBallsArray.find((shownBalls) => shownBalls.playerId === userId);

export const GoldenBallsGamePage = () => {
    const [userGoldenBalls, setUserGoldenBalls] = useState<GoldenBall[]>(null);
    const [shownBalls, setShownBalls] = useState<
        {
            playerId: string;
            shownBalls: GoldenBall[];
        }[]
    >(null);

    const { playerState, usersDetails } = useSelector(
        (state: RootState) => state.gameMetadata,
    );
    const {
        userId: currentUserId,
        userName: currentUserName,
        userPhotoUrl: currentUserPhotoUrl,
    } = useSelector((state: RootState) => state.currentUser);

    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();

    const onSocketStartGoldenBallsRound = useCallback(
        (goldenBallsRoundStartResponse: GoldenBallsRoundStartResponse) => {
            dispatch(setPlayerState(PlayerStates.IN_GOLDEN_BALLS_ROUND));
            setUserGoldenBalls(
                goldenBallsRoundStartResponse.userGoldenBallsAssignment,
            );
            setShownBalls(goldenBallsRoundStartResponse.shownBallsAssignments);
            console.log('start-round!!!!', goldenBallsRoundStartResponse);
        },
        [dispatch],
    );

    const onSocketPrepareGoldenBallsRound = useCallback(() => {
        console.log('preparing');
        dispatch(setPlayerState(PlayerStates.PREPARING_GOLDEN_BALLS));
    }, [dispatch]);

    const onSocketKicked = useCallback(
        (kickedUserId: string) => {
            dispatch(setPlayerState(PlayerStates.NOT_IN_GAME));
            if (kickedUserId === currentUserId) {
                navigate('/new-game');
            }
        },
        [currentUserId, dispatch, navigate],
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
            socket.on('kicked', onSocketKicked);
        }
    }, [
        onSocketKicked,
        onSocketPrepareGoldenBallsRound,
        onSocketStartGoldenBallsRound,
        socket,
    ]);

    let userShownBallsToComponentsMapping = [];

    if (shownBalls) {
        userShownBallsToComponentsMapping = usersDetails
            .filter((usersDetails) => usersDetails.userId !== currentUserId)
            .map((userDetails) => (
                <GoldenBallsPlayerCollection
                    shownBalls={
                        getUserShownBalls(userDetails.userId, shownBalls)
                            .shownBalls
                    }
                    userName={userDetails.userName}
                    userPhoto={userDetails.userPhotoUrl}
                />
            ));
    }

    const isPreparing = playerState === PlayerStates.PREPARING_GOLDEN_BALLS;

    return shownBalls ? (
        <>
            <GoldenBallsOpponentsWrapper>
                <GoldenBallsOpponentsWrapperChild>
                    {userShownBallsToComponentsMapping[0] || null}
                    {userShownBallsToComponentsMapping[1] || null}
                </GoldenBallsOpponentsWrapperChild>
                <GoldenBallsOpponentsWrapperChild>
                    {userShownBallsToComponentsMapping[2] || null}
                    <GoldenBallsGameInfoWrapper>
                        {isPreparing && (
                            <LoadingSpinner
                                $dimension={200}
                                $innerText="PREPARING"
                            />
                        )}
                    </GoldenBallsGameInfoWrapper>
                    {userShownBallsToComponentsMapping[3] || null}
                </GoldenBallsOpponentsWrapperChild>
            </GoldenBallsOpponentsWrapper>

            <GoldenBallsPlayerCollection
                userName={currentUserName}
                userPhoto={currentUserPhotoUrl}
                shownBalls={
                    getUserShownBalls(currentUserId, shownBalls).shownBalls
                }
            />
        </>
    ) : (
        <LoadingSpinner $dimension={200} $innerText="LOADING" />
    );
};
