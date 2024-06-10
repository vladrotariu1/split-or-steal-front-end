import { GoldenBall } from '../models/GoldenBall.ts';

export interface GoldenBallsRoundEndResponse {
    ballsAssignments: { playerId: string; balls: GoldenBall[] }[];
    kickedUserId: string;
    killerBallsRemained: number;
    newRoomPot: number;
}
