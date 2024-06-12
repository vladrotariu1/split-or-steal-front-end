import styled from 'styled-components';
import {
    MAIN_COLOR_GREY,
    TEXT_COLOR_SILVER,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const ChatMessageListWrapper = styled.ul`
    height: 100%;
    overflow-y: scroll;
    padding-inline-start: 0;
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
    bottom: 8px;
    position: absolute;
    //transform: translateY(50%);
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
