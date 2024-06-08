import { GoldenBall } from '../models/GoldenBall.ts';

export interface GoldenBallsRoundStartResponse {
    userGoldenBallsAssignment: GoldenBall[];
    shownBallsAssignments: {
        playerId: string;
        shownBalls: GoldenBall[];
    }[];
}
