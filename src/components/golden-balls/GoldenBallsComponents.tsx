import styled from 'styled-components';
import {
    GOLDEN_BALL_YELLOW,
    MAIN_COLOR_BLUE_MARINE,
    SCAFFOLD_GOLDEN_BALL_YELLOW,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const GoldenBall = styled.span<{
    $isKillerBall: boolean;
    $isShownBall: boolean;
    $marginRight?: number;
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

    margin-right: ${(props) =>
        `${props.$marginRight !== undefined ? props.$marginRight : 16}px`};

    align-items: center;
    border: 4px solid ${GOLDEN_BALL_YELLOW};
    border-radius: 50%;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    height: 60px;
    justify-content: center;
    width: 60px;
`;

export const GoldenBallScaffold = styled.span`
    //border: 4px solid ${SCAFFOLD_GOLDEN_BALL_YELLOW};
    background-color: ${SCAFFOLD_GOLDEN_BALL_YELLOW};
    border-radius: 50%;
    height: 60px;
    margin-right: 16px;
    width: 60px;
`;

export const GoldenBallSetKillerDeclarationButton = styled.button`
    background-color: ${TEXT_COLOR_RED};
    border: none;
    color: ${TEXT_COLOR_WHITE};
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 8px;
    padding: 4px 0;
    text-align: center;
    width: 100%;
`;

export const GoldenBallResetDeclarationButton = styled.button`
    background-color: ${TEXT_COLOR_GREEN};
    border: none;
    color: ${MAIN_COLOR_BLUE_MARINE};
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    margin-top: 8px;
    padding: 4px 0;
    text-align: center;
    width: 100%;
`;

export const GoldenBallDeclarationInput = styled.input`
    appearance: textfield;
    background-color: ${GOLDEN_BALL_YELLOW};
    border: none;
    border-radius: 50%;
    caret-color: transparent;
    color: ${MAIN_COLOR_BLUE_MARINE};
    font-size: 16px;
    font-family: inherit;
    font-weight: 600;
    height: 60px;
    outline: none;
    text-align: center;
    width: 60px;

    &:focus {
        outline: 2px solid ${TEXT_COLOR_GREEN};
    }
`;

export const GoldenBallsDeclaredText = styled.p`
    color: ${GOLDEN_BALL_YELLOW};
    font-size: 20px;
    font-weight: 500;
    margin: 0;
`;

export const DeclareAllGoldenBallsText = styled.p`
    color: ${TEXT_COLOR_RED};
    font-size: 20px;
    font-weight: 500;
    margin: 0;
`;

export const SendGoldenBallsDeclarationsButton = styled.button`
    background-color: ${TEXT_COLOR_GREEN};
    border: none;
    border-radius: 4px;
    color: ${MAIN_COLOR_BLUE_MARINE};
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 8px;
`;

export const KickButton = styled.button`
    background-color: ${TEXT_COLOR_RED};
    border: none;
    border-radius: 2px;
    color: ${TEXT_COLOR_WHITE};
    cursor: pointer;
    font-size: 16px;
    margin-top: 16px;
    padding: 4px 16px;
`;
