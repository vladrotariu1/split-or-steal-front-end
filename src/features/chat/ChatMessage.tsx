import { ProfilePicture } from '../../components/shared/ProfilePicture.tsx';
import { DEFAULT_USER_IMAGE_URL } from '../../utils/Variables.ts';
import {
    ChatMessageText,
    ChatMessageUsername,
} from '../../components/chat/ChatComponents.tsx';
import {
    ChatMessageMetadataWrapper,
    ChatMessageWrapper,
} from '../../components/chat/ChatWrappers.tsx';

interface ChatMessageProps {
    imageUrl: string;
    userName: string;
    userNameColor: string;
    text: string;
}

export const ChatMessage = ({
    imageUrl,
    userName,
    userNameColor,
    text,
}: ChatMessageProps) => {
    return (
        <ChatMessageWrapper>
            <ChatMessageMetadataWrapper>
                <ChatMessageUsername $color={userNameColor}>
                    {userName}
                </ChatMessageUsername>
                <ProfilePicture
                    $imageUrl={imageUrl || DEFAULT_USER_IMAGE_URL}
                    $changePhotoActivated={false}
                    $dimension={24}
                />
            </ChatMessageMetadataWrapper>
            <ChatMessageText>{text}</ChatMessageText>
        </ChatMessageWrapper>
    );
};
