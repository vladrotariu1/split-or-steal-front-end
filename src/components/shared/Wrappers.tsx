import styled from 'styled-components';

export const TopLeftPositionedWrapper = styled.div`
    left: 16px;
    position: absolute;
    top: 16px;
`;

export const TopRightPositionedWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 16px;
`;

export const TopCenteredPositionedWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 50%;
    top: 16px;
    transform: translateX(50%);
`;
