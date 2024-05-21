import styled from 'styled-components';
import { TEXT_COLOR_SILVER } from '../../utils/Styles.ts';

export const SplitOrStealGreenLogo = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(../../../src/assets/svg/split-or-steal-logo-green.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
`;

export const CardIcon = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(../../../src/assets/svg/credit-card.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
`;

export const ListDisc = styled.span<{ $dimension }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-color: ${TEXT_COLOR_SILVER};
    border-radius: 50%;
    display: block;
    margin: 0 12px;
`;
