import styled from 'styled-components';
import { TEXT_COLOR_SILVER, TEXT_COLOR_WHITE } from '../../utils/Styles.ts';

export const PaymentMethodType = styled.p`
    color: ${TEXT_COLOR_WHITE};
    margin: 0;
`;

export const PaymentMethodDetailsList = styled.ul`
    align-items: center;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding-inline-start: 0;
    margin: 8px 0;
`;

export const PaymentMethodDetailsListItem = styled.li`
    color: ${TEXT_COLOR_SILVER};
`;
