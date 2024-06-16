export interface UserToKickAdviceDto {
    goldenBallsAssignments: { playerId: string; shownGoldenBalls: number[] }[];
    roomPot: number;
}
