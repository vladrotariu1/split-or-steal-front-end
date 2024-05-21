import { Choices } from '../enums/Choices.ts';

export interface PlayersChoicesResponse {
    player1: PlayerChoice;
    player2: PlayerChoice;
}

interface PlayerChoice {
    id: string;
    choice: Choices;
}
