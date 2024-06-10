import styled from 'styled-components';

export const GoldenBallsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    :last-child {
        margin-right: 0;
    }
`;

export const GoldenBallsCollectionWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

export const GoldenBallsPlayerCollectionWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

export const GoldenBallsGameInfoWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 500px;
    justify-content: center;
    width: 500px;
`;

export const GoldenBallsOpponentsWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

export const GoldenBallsOpponentsWrapperChild = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`;

export const GoldenBallDeclarationWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 8px;
`;

export const GoldenBallsDeclarationsArrayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
`;

export const GoldenBallsDeclarationsWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    right: 0;
    transform: translateX(200%);
`;

export const GoldenBallsPlayerSectionWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    position: relative;
`;
