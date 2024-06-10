export interface PrepareSplitOrStealResponse {
    finalists: {
        player1Id: string;
        player2Id: string;
    };
    preparationDuration: number;
    recalculatedRoomPotObject: {
        killerBallsRemained: number;
        killerBallsRemovedBalance: number;
        newRoomPot: number;
    };
}
