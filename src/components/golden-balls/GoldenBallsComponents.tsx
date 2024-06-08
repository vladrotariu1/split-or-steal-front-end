import styled from 'styled-components';
import {
    GOLDEN_BALL_YELLOW,
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const GoldenBall = styled.span<{
    $isKillerBall: boolean;
    $isShownBall: boolean;
}>`
    background-color: ${({ $isKillerBall, $isShownBall }) => {
        if ($isShownBall && $isKillerBall) {
            return TEXT_COLOR_RED;
        } else if ($isShownBall && !$isKillerBall) {
            return TEXT_COLOR_GREEN;
        } else {
            return GOLDEN_BALL_YELLOW;
        }
    }};

    color: ${({ $isKillerBall, $isShownBall }) => {
        if ($isShownBall && $isKillerBall) {
            return TEXT_COLOR_WHITE;
        } else if (!$isShownBall && $isKillerBall) {
            return TEXT_COLOR_RED;
        } else {
            return MAIN_COLOR_BLUE_MARINE;
        }
    }};

    align-items: center;
    border: 4px solid ${GOLDEN_BALL_YELLOW};
    border-radius: 50%;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    height: 60px;
    justify-content: center;
    margin-right: 16px;
    width: 60px;
`;
