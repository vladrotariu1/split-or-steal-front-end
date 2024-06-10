import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    MAIN_COLOR_GREY,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_SILVER,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const ChatMessageListWrapper = styled.ul`
    height: 100%;
    overflow-y: scroll;
    padding-inline-start: 0;
`;

export const ChatWrapper = styled.div<{
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

export const ChatMessageWrapper = styled.div`
    margin-bottom: 32px;
`;

export const ChatMessageMetadataWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

export const ChatMessageInputWrapper = styled.div`
    background: ${MAIN_COLOR_GREY};
    bottom: 0;
    position: absolute;
    transform: translateY(50%);
`;

export const ChatMetadataWrapper = styled.div`
    align-items: center;
    border-bottom: 1px solid ${MAIN_COLOR_GREY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 16px;
`;

export const PlayerChoiceWrapper = styled.div`
    align-items: center;
    color: ${TEXT_COLOR_SILVER};
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 24px;
    justify-content: center;
`;

export const PlayingAgainstWrapper = styled.div`
    color: ${TEXT_COLOR_WHITE};
    font-size: 16px;
`;

export const ResultsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 200px;
    margin-bottom: 24px;
    width: 100%;
`;

export const SplitOrStealChoiceWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
`;
