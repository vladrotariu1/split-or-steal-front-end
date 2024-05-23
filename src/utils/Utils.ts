import { Choices } from '../models/enums/Choices.ts';
import {
    TEXT_COLOR_GREEN,
    TEXT_COLOR_RED,
    TEXT_COLOR_YELLOW,
} from '../config/Styles.ts';
import { GameOutcomes } from '../models/enums/GameOutcomes.ts';

export const getChoiceColor = (choice: Choices) => {
    return choice === Choices.SPLIT ? TEXT_COLOR_GREEN : TEXT_COLOR_RED;
};

export const computeOutcome = (
    playerChoice: Choices,
    opponentChoice: Choices,
) => {
    if (playerChoice === opponentChoice && playerChoice === Choices.SPLIT) {
        return GameOutcomes.SPLIT;
    } else if (
        playerChoice === opponentChoice &&
        playerChoice === Choices.STEAL
    ) {
        return GameOutcomes.BOTH_LOOSE;
    } else if (
        playerChoice === Choices.STEAL &&
        opponentChoice === Choices.SPLIT
    ) {
        return GameOutcomes.WON;
    } else return GameOutcomes.LOST;
};

export const getOutcomeColor = (gameOutcome: GameOutcomes) => {
    switch (gameOutcome) {
        case GameOutcomes.BOTH_LOOSE:
        case GameOutcomes.LOST:
            return TEXT_COLOR_RED;
        case GameOutcomes.SPLIT:
            return TEXT_COLOR_YELLOW;
        case GameOutcomes.WON:
            return TEXT_COLOR_GREEN;
    }
};
