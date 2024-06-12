import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_GREEN,
} from '../../config/Styles.ts';

export const FixedBottomLeftWrapper = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
`;

export const TopLeftPositionedWrapper = styled.div`
    left: 16px;
    position: absolute;
    top: 16px;
`;

export const TopRightPositionedWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 16px;
`;

export const TopCenteredPositionedWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 50%;
    top: 16px;
    transform: translateX(50%);
`;

export const BlueMarineWrapper = styled.div<{
    $boxShadow?: string | undefined;
    $startAnimation: boolean;
}>`
    animation: ${(props) => props.$startAnimation && 'glowing 2s infinite'};
    box-shadow: ${(props) => `0px 0px 50px 0px ${props.$boxShadow || ''}`};

    background: ${MAIN_COLOR_BLUE_MARINE};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    height: 560px;
    justify-content: center;
    padding: 0 48px 0 48px;
    position: relative;
    transition: box-shadow 0.5s ease-in-out;
    width: 360px;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 50px 0 ${TEXT_COLOR_GREEN};
        }
        50% {
            box-shadow: 0 0 10px 0 ${TEXT_COLOR_GREEN};
        }
        100% {
            box-shadow: 0 0 50px 0 ${TEXT_COLOR_GREEN};
        }
    }
`;

export const MinimisedBlueMarineWrapper = styled.div`
    align-items: center;
    background-color: ${MAIN_COLOR_BLUE_MARINE};
    border-radius: 0 16px;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    width: 360px;
`;
