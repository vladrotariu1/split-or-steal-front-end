import { ChatMessageListWrapper } from '../../components/chat/ChatWrappers.tsx';
import { ChatMessage } from './ChatMessage.tsx';
import { CHAT_USERNAME_RED, TEXT_COLOR_GREEN } from '../../config/Styles.ts';
import { Message } from '../../models/models/Message.ts';

interface ChatMessageListProps {
    currentUserId;
    messagesList: Message[];
}

export const ChatMessageList = ({
    currentUserId,
    messagesList,
}: ChatMessageListProps) => {
    return (
        <ChatMessageListWrapper>
            {messagesList.map((message) => (
                <ChatMessage
                    key={message.id}
                    imageUrl={message.userProfilePictureUrl}
                    userName={message.userName}
                    userNameColor={
                        message.userId === currentUserId
                            ? TEXT_COLOR_GREEN
                            : CHAT_USERNAME_RED
                    }
                    text={message.text}
                />
            ))}
        </ChatMessageListWrapper>
    );
};
