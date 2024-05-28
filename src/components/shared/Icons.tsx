import styled from 'styled-components';
import { TEXT_COLOR_GREEN, TEXT_COLOR_SILVER } from '../../config/Styles.ts';

import backArrowUrl from '/svg/back-arrow.svg';
import closeUrl from '/svg/close.svg';
import creditCardUrl from '/svg/credit-card.svg';
import greenLogoUrl from '/svg/split-or-steal-logo-green.svg';
import loadingSpinnerUrl from '/gifs/loading-spinner.gif';

export const BackArrow = styled.span<{ $dimension }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(${backArrowUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    display: block;
`;

export const CardIcon = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(${creditCardUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
`;

export const CloseIcon = styled.span<{ $dimension: number }>`
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-image: url(${closeUrl});
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
    background-image: url(${loadingSpinnerUrl});
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

    background-image: url(${greenLogoUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
`;
