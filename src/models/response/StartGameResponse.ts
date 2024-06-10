import { ChatUserDetailsResponse } from './UserDetailsResponse.ts';

export interface StartGameResponse {
    numberOfKillerBalls: number;
    roomPot: number;
    usersDetails: ChatUserDetailsResponse[];
}
