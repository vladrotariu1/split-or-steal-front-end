import styled from 'styled-components';

export const RoundTimer = styled.span<{ $color: string; $fontSize: number }>`
    color: ${(props) => props.$color};
    font-size: ${(props) => `${props.$fontSize}px`};
`;
