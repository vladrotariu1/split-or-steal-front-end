import { useParams } from 'react-router-dom';
import { ChatMessageList } from '../chat/ChatMessageList.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useGetGameMessagesQuery } from '../../store/api/userProfileApi.ts';
import { BlueMarineWrapper } from '../../components/shared/Wrappers.tsx';

export const GameDetailsPage = () => {
    const { id: gameId } = useParams<{ id: string }>();
    const { userId } = useSelector((state: RootState) => state.currentUser);
    const { data: messagesList } = useGetGameMessagesQuery(gameId, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <BlueMarineWrapper $startAnimation={false}>
            {messagesList && (
                <ChatMessageList
                    currentUserId={userId}
                    messagesList={messagesList}
                />
            )}
        </BlueMarineWrapper>
    );
};
