import {
    GoldenBallsCollectionWrapper,
    GoldenBallsPlayerCollectionWrapper,
    GoldenBallsWrapper,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import { ShortUserProfile } from '../../components/shared/ProfilePicture.tsx';
import { ChatMessageUsername } from '../../components/chat/ChatComponents.tsx';
import { TEXT_COLOR_RED } from '../../config/Styles.ts';
import { GoldenBallScaffold } from '../../components/golden-balls/GoldenBallsComponents.tsx';

export const GoldenBallsPlayerCollectionScaffold = () => {
    return (
        <GoldenBallsPlayerCollectionWrapper>
            <ShortUserProfile>
                <ChatMessageUsername $color={TEXT_COLOR_RED}>
                    No Player
                </ChatMessageUsername>
            </ShortUserProfile>
            <GoldenBallsCollectionWrapper>
                <GoldenBallsWrapper>
                    <GoldenBallScaffold />
                    <GoldenBallScaffold />
                </GoldenBallsWrapper>
                <GoldenBallsWrapper>
                    <GoldenBallScaffold />
                    <GoldenBallScaffold />
                    <GoldenBallScaffold />
                </GoldenBallsWrapper>
            </GoldenBallsCollectionWrapper>
        </GoldenBallsPlayerCollectionWrapper>
    );
};
