import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';
import { Choices } from '../../models/enums/Choices.ts';

export const SplitOrStealTitle = styled.h1`
    color: ${TEXT_COLOR_WHITE};
    font-size: 72px;
`;

export const SplitOrStealChoiceButton = styled.button<{
    $choice: Choices;
    $isFocused: boolean;
}>`
    background-color: ${(props) =>
        props.$choice === Choices.SPLIT ? TEXT_COLOR_GREEN : TEXT_COLOR_RED};
    box-shadow: ${(props) =>
        props.$isFocused
            ? `0px -1px 44px 0px ${props.$choice === Choices.SPLIT ? TEXT_COLOR_GREEN : TEXT_COLOR_RED}`
            : ''};
    color: ${(props) =>
        props.$choice === Choices.SPLIT
            ? MAIN_COLOR_BLUE_MARINE
            : TEXT_COLOR_WHITE};

    align-items: center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    font-size: 36px;
    height: 120px;
    justify-content: center;
    margin: 36px;
    transition: box-shadow 0.3s ease-in-out;
    width: 120px;
`;
