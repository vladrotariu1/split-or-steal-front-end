import styled from 'styled-components';
import { MAIN_COLOR_BLUE_MARINE } from '../../utils/Styles.ts';

export const UserProfileWrapper = styled.div`
    align-items: center;
    background-color: ${MAIN_COLOR_BLUE_MARINE};
    display: flex;
    flex-direction: column;
    padding: 48px;
    width: 300px;
`;

export const UserProfileStatsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const UserProfileStatWrapper = styled.div<{ $color }>`
    align-items: center;
    color: ${(props) => props.$color};
    display: flex;
    flex-direction: column;
`;
