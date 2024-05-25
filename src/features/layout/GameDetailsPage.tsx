import { useParams } from 'react-router-dom';
import { ChatWrapper } from '../../components/chat/ChatWrappers.tsx';
import { ChatMessageList } from '../chat/ChatMessageList.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useGetGameMessagesQuery } from '../../store/api/userProfileApi.ts';

export const GameDetailsPage = () => {
    const { id: gameId } = useParams<{ id: string }>();
    const { userId } = useSelector((state: RootState) => state.currentUser);
    const { data: messagesList } = useGetGameMessagesQuery(gameId, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <ChatWrapper $startAnimation={false}>
            {messagesList && (
                <ChatMessageList
                    currentUserId={userId}
                    messagesList={messagesList}
                />
            )}
        </ChatWrapper>
    );
};
