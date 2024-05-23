import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const AuthFormWrapper = styled.div<{ $hangingText }>`
    background-color: ${MAIN_COLOR_BLUE_MARINE};
    box-sizing: border-box;
    display: flex;
    padding: 48px;
    position: relative;
    width: 800px;

    &:before {
        color: ${TEXT_COLOR_WHITE};
        content: ${(props) => `'${props.$hangingText}'`};
        font-size: 32px;
        font-weight: 700;
        left: 0;
        position: absolute;
        top: -48px;
        transform: translateY(-100%);
    }
`;

export const AuthFormWrapperLeftSide = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const AuthFormWrapperRightSide = styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
`;
