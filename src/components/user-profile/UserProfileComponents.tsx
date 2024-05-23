import styled from 'styled-components';
import { TEXT_COLOR_WHITE } from '../../config/Styles.ts';

export const UserProfileEmail = styled.h1`
    color: ${TEXT_COLOR_WHITE};
    font-size: 16px;
    font-weight: 300;
    margin-top: 16px;
`;

export const UserProfileDelimiter = styled.div`
    background-color: #2a2a2a;
    height: 1px;
    margin: 24px 0;
    width: 100%;
`;

export const UserProfileStatValue = styled.h2`
    font-size: 72px;
    font-weight: 600;
    margin: 0;
`;

export const UserProfileStatDescription = styled.h3`
    font-size: 16px;
    font-weight: 400;
    margin: 0;
`;
