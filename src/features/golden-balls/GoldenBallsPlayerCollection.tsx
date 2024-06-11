import {
    GoldenBallsCollectionWrapper,
    GoldenBallsPlayerCollectionWrapper,
    GoldenBallsWrapper,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import {
    GoldenBall,
    KickButton,
} from '../../components/golden-balls/GoldenBallsComponents.tsx';
import { ChatMessageUsername } from '../../components/chat/ChatComponents.tsx';
import { TEXT_COLOR_SILVER } from '../../config/Styles.ts';
import {
    ProfilePicture,
    ShortUserProfile,
} from '../../components/shared/ProfilePicture.tsx';
import { GoldenBall as GoldenBallType } from '../../models/models/GoldenBall.ts';
import { WhiteText } from '../../components/shared/Text.tsx';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { LoadingSpinner } from '../../components/shared/Icons.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';

interface GoldenBallsPlayerCollectionProps {
    enableKickButton: boolean;
    isUserKicked: boolean;
    isUerKickVoted?: boolean;
    handleKickUser?: () => void;
    hiddenBalls?: GoldenBallType[];
    shownBalls: GoldenBallType[];
    showHiddenBalls: boolean;
    userName: string;
    userPhoto: string;
}

export const GoldenBallsPlayerCollection = ({
    enableKickButton,
    isUserKicked,
    isUerKickVoted,
    handleKickUser,
    hiddenBalls,
    shownBalls,
    showHiddenBalls,
    userName,
    userPhoto,
}: GoldenBallsPlayerCollectionProps) => {
    const { playerState } = useSelector(
        (state: RootState) => state.gameMetadata,
    );

    return shownBalls ? (
        <GoldenBallsPlayerCollectionWrapper>
            <ShortUserProfile>
                <ChatMessageUsername $color={TEXT_COLOR_SILVER}>
                    {userName}
                </ChatMessageUsername>
                <ProfilePicture
                    $imageUrl={userPhoto}
                    $changePhotoActivated={false}
                    $dimension={32}
                />
            </ShortUserProfile>
            <GoldenBallsCollectionWrapper>
                <GoldenBallsWrapper>
                    {shownBalls.map((goldenBall) => (
                        <GoldenBall
                            key={goldenBall.id}
                            $isShownBall={true}
                            $isKillerBall={goldenBall.value === -1}
                        >
                            {goldenBall.value === -1
                                ? 'KILLER'
                                : goldenBall.value}
                        </GoldenBall>
                    ))}
                </GoldenBallsWrapper>
                <GoldenBallsWrapper>
                    {hiddenBalls ? (
                        hiddenBalls.map((goldenBall) => (
                            <GoldenBall
                                key={goldenBall.id}
                                $isShownBall={showHiddenBalls}
                                $isKillerBall={goldenBall.value === -1}
                            >
                                {goldenBall.value === -1
                                    ? 'KILLER'
                                    : goldenBall.value}
                            </GoldenBall>
                        ))
                    ) : (
                        <>
                            <GoldenBall
                                $isShownBall={false}
                                $isKillerBall={false}
                            />
                            <GoldenBall
                                $isShownBall={false}
                                $isKillerBall={false}
                            />
                            <GoldenBall
                                $isShownBall={false}
                                $isKillerBall={false}
                            />
                        </>
                    )}
                </GoldenBallsWrapper>
            </GoldenBallsCollectionWrapper>
            {enableKickButton &&
                playerState === PlayerStates.IN_GOLDEN_BALLS_ROUND && (
                    <>
                        {isUerKickVoted ? (
                            '❌'
                        ) : (
                            <KickButton onClick={handleKickUser}>
                                KICK
                            </KickButton>
                        )}
                    </>
                )}
            {isUserKicked && <WhiteText>🚫 Kicked 🚫</WhiteText>}
        </GoldenBallsPlayerCollectionWrapper>
    ) : (
        <LoadingSpinner $dimension={120} />
    );
};
