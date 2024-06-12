import { ChatMessageInputWrapper } from '../../components/chat/ChatWrappers.tsx';
import { ChatMessageInput as ChatMessageInputComponent } from '../../components/chat/ChatComponents.tsx';
import React from 'react';

interface ChatMessageInputProps {
    // eslint-disable-next-line no-unused-vars
    handleOnInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line no-unused-vars
    handleOnKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputDisabled: boolean;
    inputTextPlaceholder: string;
    inputValue;
}

export const ChatMessageInput = ({
    handleOnInputChange,
    handleOnKeyPress,
    inputDisabled,
    inputTextPlaceholder,
    inputValue,
}: ChatMessageInputProps) => {
    return (
        <ChatMessageInputWrapper>
            <ChatMessageInputComponent
                onChange={handleOnInputChange}
                onKeyPress={handleOnKeyPress}
                placeholder={inputTextPlaceholder}
                type="text"
                value={inputValue}
                disabled={inputDisabled}
            />
        </ChatMessageInputWrapper>
    );
};
