import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_SILVER,
} from '../../config/Styles.ts';

export const ChatMessageText = styled.p`
    color: ${TEXT_COLOR_SILVER};
    font-weight: 400;
    margin: 8px 0;
`;

export const ChatMessageUsername = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};

    display: block;
    font-weight: 600;
    margin-right: 8px;
`;

export const ChatMessageInput = styled.input`
    background: transparent;
    box-shadow: 0 9px 24px 0 rgba(0, 0, 0, 0.75);
    border: none;
    border-radius: 4px;
    color: ${TEXT_COLOR_SILVER};
    font-size: 16px;
    padding: 8px;
    width: 360px;
    z-index: 1;
    -webkit-box-shadow: 0 9px 24px 0 rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0 9px 24px 0 rgba(0, 0, 0, 0.75);

    &:disabled {
        cursor: not-allowed;
    }

    &:focus {
        border: none;
        outline: none;
    }
`;

export const OpponentName = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    display: block;
    font-size: 16px;
    margin-top: 8px;
`;

export const PlayerChoice = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    display: block;
    font-size: 72px;
`;

export const SplitOrStealIcon = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    cursor: pointer;
    margin: 4px;
`;

export const StartNewGameButton = styled.button`
    align-self: center;
    background-color: ${TEXT_COLOR_GREEN};
    border: none;
    border-radius: 8px;
    color: ${MAIN_COLOR_BLUE_MARINE};
    cursor: pointer;
    display: compact;
    font-size: 24px;
    font-weight: 600;
    padding: 8px;
    text-transform: uppercase;
`;
