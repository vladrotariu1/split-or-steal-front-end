import { Choices } from '../enums/Choices.ts';

export interface GameHistoryResponse {
    id: string;
    creationDate: number;
    currentPlayerChoice: Choices;
    opponentChoice: Choices;
    opponentName: string;
}
