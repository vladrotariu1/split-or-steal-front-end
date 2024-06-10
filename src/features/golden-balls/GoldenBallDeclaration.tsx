import React, { useState } from 'react';
import { isNumber } from '../../utils/Format.ts';
import { GoldenBallDeclarationWrapper } from '../../components/golden-balls/GoldenBallsWrappers.tsx';
import {
    GoldenBallDeclarationInput,
    GoldenBallResetDeclarationButton,
    GoldenBallSetKillerDeclarationButton,
} from '../../components/golden-balls/GoldenBallsComponents.tsx';

interface GoldenBallDeclarationProps {
    isBallDisabled: boolean;
    // eslint-disable-next-line no-unused-vars
    setBallDeclaration: (x: number) => void;
    removeBallDeclaration: () => void;
}

export const GoldenBallDeclaration = ({
    isBallDisabled,
    removeBallDeclaration,
    setBallDeclaration,
}: GoldenBallDeclarationProps) => {
    const [isKillerBall, setIsKillerBall] = useState(false);
    const [ballValue, setBallValue] = useState<string>('');

    const handleOnInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (isNumber(event.target.value)) {
            setBallValue(event.target.value);
            setBallDeclaration(Number(event.target.value));
        } else if (event.target.value === '') {
            setBallValue('');
            removeBallDeclaration();
        }
    };

    const handleClickOnGoldenBallResetDeclarationButton = () => {
        setBallValue('');
        setIsKillerBall(false);
        removeBallDeclaration();
    };

    const handleClickOnGoldenBallSetKillerDeclarationButton = () => {
        setIsKillerBall(true);
        setBallDeclaration(-1);
    };

    return (
        <GoldenBallDeclarationWrapper>
            <GoldenBallDeclarationInput
                type="text"
                inputMode="numeric"
                onChange={handleOnInputChange}
                value={isKillerBall ? 'KILLER' : ballValue}
                disabled={isKillerBall || isBallDisabled}
            />
            {!isBallDisabled &&
                (isKillerBall ? (
                    <GoldenBallResetDeclarationButton
                        onClick={handleClickOnGoldenBallResetDeclarationButton}
                    >
                        RESET
                    </GoldenBallResetDeclarationButton>
                ) : (
                    <GoldenBallSetKillerDeclarationButton
                        onClick={
                            handleClickOnGoldenBallSetKillerDeclarationButton
                        }
                    >
                        KILLER
                    </GoldenBallSetKillerDeclarationButton>
                ))}
        </GoldenBallDeclarationWrapper>
    );
};
