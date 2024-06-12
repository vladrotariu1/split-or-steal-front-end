import styled from 'styled-components';
import {
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const RedText = styled.span`
    color: ${TEXT_COLOR_RED};
`;

export const GreenText = styled.span`
    color: ${TEXT_COLOR_GREEN};
`;

export const MoneyPotText = styled.h2`
    color: ${TEXT_COLOR_WHITE};
`;

export const WhiteText = styled.span`
    color: ${TEXT_COLOR_WHITE};
`;

export const CustomText = styled.span<{ $color: string; $fontSize: number }>`
    color: ${(props) => props.$color};
    font-size: ${(props) => `${props.$fontSize}px`};
`;
