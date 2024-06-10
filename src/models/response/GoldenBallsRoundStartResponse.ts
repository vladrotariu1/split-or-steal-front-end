import { GoldenBall } from '../models/GoldenBall.ts';

export interface GoldenBallsRoundStartResponse {
    roundDuration: number;
    userGoldenBallsAssignment: GoldenBall[];
    shownBallsAssignments: {
        playerId: string;
        shownBalls: GoldenBall[];
    }[];
}
