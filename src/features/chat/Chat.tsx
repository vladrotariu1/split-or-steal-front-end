import React, { useContext, useEffect, useState } from 'react';
import { Message } from '../../models/models/Message.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { SocketContext } from '../../context/SocketContext.tsx';
import {
    BlueMarineWrapper,
    FixedBottomLeftWrapper,
    MinimisedBlueMarineWrapper,
    TopRightPositionedWrapper,
} from '../../components/shared/Wrappers.tsx';
import { ChatMessageList } from './ChatMessageList.tsx';
import { ChatMessageInput } from './ChatMessageInput.tsx';
import {
    DownArrow,
    LoadingSpinner,
    UpArrow,
} from '../../components/shared/Icons.tsx';
import { addMessageToList } from '../../store/slices/gameMetadata.slice.ts';
import { GreenText } from '../../components/shared/Text.tsx';

export const Chat = () => {
    const [message, setMessage] = useState('');
    const [isChatMinimised, setIsChatMinimised] = useState(true);

    const { userId, loggedIn } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { chatMessageList } = useSelector(
        (state: RootState) => state.gameMetadata,
    );

    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    console.log('socket:', socket);

    const onSocketMessage = (message: Message) => {
        console.log('new-message', message);
        dispatch(addMessageToList(message));
    };

    const handleOnInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMessage(event.target.value);
    };

    const handleOnKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (message && event.key === 'Enter') {
            socket.emit('message', message);

            setMessage('');
        }
    };

    const handleOnClickOnMinimisedRoomChat = () => {
        setIsChatMinimised(false);
    };

    const handleOnClickChatMinimiseArrow = () => {
        setIsChatMinimised(true);
    };

    useEffect(() => {
        if (socket) {
            socket.removeAllListeners('message');
            socket.on('message', onSocketMessage);
        }
    }, [socket]);

    const textPlaceholder = `Type your message${!loggedIn ? ' (please login 🔒)' : ' ✏️'}`;

    return (
        <FixedBottomLeftWrapper>
            {!isChatMinimised ? (
                <BlueMarineWrapper $startAnimation={false}>
                    <TopRightPositionedWrapper>
                        <DownArrow
                            $dimension={24}
                            onClick={handleOnClickChatMinimiseArrow}
                        />
                    </TopRightPositionedWrapper>
                    {socket ? (
                        <>
                            <ChatMessageList
                                currentUserId={userId}
                                messagesList={chatMessageList}
                            />

                            <ChatMessageInput
                                handleOnInputChange={handleOnInputChange}
                                handleOnKeyPress={handleOnKeyPress}
                                inputDisabled={!loggedIn}
                                inputTextPlaceholder={textPlaceholder}
                                inputValue={message}
                            />
                        </>
                    ) : (
                        <LoadingSpinner
                            $dimension={160}
                            $innerText={'LOADING CHAT'}
                        />
                    )}
                </BlueMarineWrapper>
            ) : (
                <MinimisedBlueMarineWrapper
                    onClick={handleOnClickOnMinimisedRoomChat}
                >
                    <TopRightPositionedWrapper>
                        <UpArrow $dimension={24} />
                    </TopRightPositionedWrapper>
                    <GreenText>Room chat</GreenText>
                </MinimisedBlueMarineWrapper>
            )}
        </FixedBottomLeftWrapper>
    );
};
