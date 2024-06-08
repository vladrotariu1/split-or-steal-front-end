import { ChatUserDetailsResponse } from './UserDetailsResponse.ts';

export interface StartGameResponse {
    chatDuration: number;
    roomPot: number;
    usersDetails: ChatUserDetailsResponse[];
}
