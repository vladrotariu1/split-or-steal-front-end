import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_SILVER,
} from '../../config/Styles.ts';

export const NavbarWrapper = styled.nav<{ $disableMouseEvents: boolean }>`
    pointer-events: ${(props) => (props.$disableMouseEvents ? 'none' : '')};

    background-color: ${MAIN_COLOR_BLUE_MARINE};
    color: ${TEXT_COLOR_SILVER};
    display: flex;
    font-weight: 500;
    height: 64px;
    position: relative;
    width: 100%;
`;

export const NavbarRightContainer = styled.ul`
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin-left: auto;
    padding-inline-start: 0;
`;

export const NavbarRightContainerElement = styled.li`
    cursor: pointer;
    list-style: none;
    margin: 0 20px;
    position: relative;
`;
