import { GoldenBallDeclaration } from './GoldenBallDeclaration.tsx';
import { useState } from 'react';
import {
    GoldenBallsDeclarationsArrayWrapper,
    GoldenBallsDeclarationsWrapper,
} from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import {
    DeclareAllGoldenBallsText,
    SendGoldenBallsDeclarationsButton,
} from '../../components/golden-balls/GoldenBallsComponents.tsx';

interface GoldenBallsDeclarationsProps {
    declarationDisabled: boolean;
    numberOfBalls: number;
    // eslint-disable-next-line no-unused-vars
    onCLickSendGoldenBallsDeclarations: (ballValues: number[]) => void;
}

export const GoldenBallsDeclarations = ({
    declarationDisabled,
    numberOfBalls,
    onCLickSendGoldenBallsDeclarations,
}: GoldenBallsDeclarationsProps) => {
    const [ballDeclarations, setBallDeclarations] = useState<{
        [key: number]: number;
    }>({});

    console.log('ball-declarations', ballDeclarations);

    const handleCLickSendGoldenBallsDeclarations = () => {
        const ballsValues = Object.values(ballDeclarations);
        onCLickSendGoldenBallsDeclarations(ballsValues);
    };

    const setBallDeclarationCallback = (id: number) => (value: number) => {
        setBallDeclarations((previousState) => ({
            ...previousState,
            [id]: value,
        }));
    };

    const removeBallDeclarationCallback = (id: number) => () => {
        // eslint-disable-next-line no-unused-vars
        setBallDeclarations(({ [id]: _, ...rest }) => rest);
    };

    const declarationCompleted =
        Object.keys(ballDeclarations).length === numberOfBalls;

    return (
        <GoldenBallsDeclarationsWrapper>
            {!declarationDisabled &&
                (!declarationCompleted ? (
                    <DeclareAllGoldenBallsText>
                        Declare all balls
                    </DeclareAllGoldenBallsText>
                ) : (
                    <SendGoldenBallsDeclarationsButton
                        onClick={handleCLickSendGoldenBallsDeclarations}
                    >
                        👉 SEND
                    </SendGoldenBallsDeclarationsButton>
                ))}
            <GoldenBallsDeclarationsArrayWrapper>
                {Array.from({ length: numberOfBalls }, (_, index) => index).map(
                    (index) => (
                        <GoldenBallDeclaration
                            isBallDisabled={declarationDisabled}
                            removeBallDeclaration={removeBallDeclarationCallback(
                                index,
                            )}
                            setBallDeclaration={setBallDeclarationCallback(
                                index,
                            )}
                            key={index}
                        />
                    ),
                )}
            </GoldenBallsDeclarationsArrayWrapper>
        </GoldenBallsDeclarationsWrapper>
    );
};
