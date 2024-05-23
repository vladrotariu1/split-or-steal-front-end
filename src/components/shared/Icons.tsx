import styled from 'styled-components';
import { TEXT_COLOR_GREEN, TEXT_COLOR_SILVER } from '../../config/Styles.ts';

export const BackArrow = styled.span<{ $dimension }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(../../../src/assets/svg/back-arrow.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
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

export const CloseIcon = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(../../../src/assets/svg/close.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
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

export const LoadingSpinner = styled.span<{
    $dimension: number;
    $innerText?: string;
}>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    align-items: center;
    align-self: center;
    background-image: url(../../../src/assets/gifs/loading-spinner.gif);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;

    &::before {
        content: ${(props) =>
            '"' + `${props.$innerText ? `${props.$innerText}` : ''}` + '"'};
        font-size: ${(props) => `${props.$dimension * 0.07}px`};

        color: ${TEXT_COLOR_GREEN};
    }
`;

export const SplitOrStealGreenLogo = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(../../../src/assets/svg/split-or-steal-logo-green.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
`;
