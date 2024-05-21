import {
    ChatMessageInputWrapper,
    SplitOrStealChoiceWrapper,
} from '../../components/chat/ChatWrappers.tsx';
import {
    ChatMessageInput as ChatMessageInputComponent,
    SplitOrStealIcon,
} from '../../components/chat/ChatComponents.tsx';
import { TEXT_COLOR_GREEN, TEXT_COLOR_YELLOW } from '../../utils/Styles.ts';
import React from 'react';

interface ChatMessageInputProps {
    displaySplitOrSteal: boolean;
    handleOnChooseSplit: () => void;
    handleOnChooseSteal: () => void;
    // eslint-disable-next-line no-unused-vars
    handleOnInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line no-unused-vars
    handleOnKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputDisabled: boolean;
    inputTextPlaceholder: string;
    inputValue;
}

export const ChatMessageInput = ({
    displaySplitOrSteal,
    handleOnChooseSplit,
    handleOnChooseSteal,
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

            {displaySplitOrSteal && (
                <SplitOrStealChoiceWrapper>
                    <SplitOrStealIcon
                        onClick={handleOnChooseSplit}
                        $color={TEXT_COLOR_YELLOW}
                    >
                        Split
                    </SplitOrStealIcon>
                    <SplitOrStealIcon
                        onClick={handleOnChooseSteal}
                        $color={TEXT_COLOR_GREEN}
                    >
                        Steal
                    </SplitOrStealIcon>
                </SplitOrStealChoiceWrapper>
            )}
        </ChatMessageInputWrapper>
    );
};
