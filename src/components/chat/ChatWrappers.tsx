import styled from 'styled-components';
import { MAIN_COLOR_BLUE_MARINE, MAIN_COLOR_GREY } from '../../utils/Styles.ts';

export const ChatMessageListWrapper = styled.ul`
    height: 100%;
    overflow-y: scroll;
    padding-inline-start: 0;
`;

export const ChatWrapper = styled.div<{
    $boxShadow: string | undefined;
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
    padding: 48px 48px 0 48px;
    position: relative;
    transition: box-shadow 0.5s ease-in-out;
    width: 360px;

    @keyframes glowing {
        0% {
            box-shadow: ${(props) => `0px 0px 50px 0px ${props.$boxShadow}`};
        }
        50% {
            box-shadow: ${(props) => `0px 0px 10px 0px ${props.$boxShadow}`};
        }
        100% {
            box-shadow: ${(props) => `0px 0px 50px 0px ${props.$boxShadow}`};
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

export const SplitOrStealChoiceWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
`;
