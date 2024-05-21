import styled from 'styled-components';
import { MAIN_COLOR_BLUE_MARINE } from '../../utils/Styles.ts';

export const PaymentMethodWrapper = styled.div`
    align-items: center;
    background-color: ${MAIN_COLOR_BLUE_MARINE};
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    margin: 16px;
    padding: 16px;
`;

export const PaymentMethodDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-left: 16px;
`;
