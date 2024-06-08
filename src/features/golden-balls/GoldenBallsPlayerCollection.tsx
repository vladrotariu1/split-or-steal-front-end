import {
    GoldenBallsCollectionWrapper,
    GoldenBallsPlayerCollectionWrapper,
    GoldenBallsWrapper,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import { GoldenBall } from '../../components/golden-balls/GoldenBallsComponents.tsx';
import { ChatMessageUsername } from '../../components/chat/ChatComponents.tsx';
import { TEXT_COLOR_SILVER } from '../../config/Styles.ts';
import {
    ProfilePicture,
    ShortUserProfile,
} from '../../components/shared/ProfilePicture.tsx';
import { GoldenBall as GoldenBallType } from '../../models/models/GoldenBall.ts';

interface GoldenBallsPlayerCollectionProps {
    shownBalls: GoldenBallType[];
    userName: string;
    userPhoto: string;
}

export const GoldenBallsPlayerCollection = ({
    shownBalls,
    userName,
    userPhoto,
}: GoldenBallsPlayerCollectionProps) => {
    return (
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
                            $isKillerBall={false}
                        >
                            {goldenBall.value}
                        </GoldenBall>
                    ))}
                </GoldenBallsWrapper>
                <GoldenBallsWrapper>
                    <GoldenBall $isShownBall={false} $isKillerBall={false} />
                    <GoldenBall $isShownBall={false} $isKillerBall={false} />
                    <GoldenBall $isShownBall={false} $isKillerBall={false} />
                </GoldenBallsWrapper>
            </GoldenBallsCollectionWrapper>
        </GoldenBallsPlayerCollectionWrapper>
    );
};
