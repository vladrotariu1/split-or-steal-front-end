import styled, { keyframes } from 'styled-components';

const slideInfoPopupRightToLeft = keyframes`
    0% {
      right: calc(-100% - 24px);
    }
    30% { 
      right: 8px;
    }
    70% {
      right: 8px;
    }
    100% {
      right: calc(-100% - 24px);
    }
`;

export const InfoPopupWrapper = styled.div<{ $borderColor }>`
    border: ${(props) => `2px solid ${props.$borderColor}`};

    animation: ${slideInfoPopupRightToLeft} 4s ease-in-out forwards;
    background-color: #0a0a18;
    border-radius: 16px;
    bottom: 48px;
    color: #fafafa;
    min-width: 200px;
    padding: 24px;
    position: fixed;
    right: 0;
    text-align: center;
`;
