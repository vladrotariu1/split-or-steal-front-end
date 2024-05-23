import styled from 'styled-components';
import { MAIN_COLOR_GREY } from '../../config/Styles.ts';

export const MainSection = styled.section`
    align-items: center;
    background-color: ${MAIN_COLOR_GREY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
`;
