import { ChatUserDetailsResponse } from './UserDetailsResponse.ts';

export interface StartGameResponse {
    usersDetails: ChatUserDetailsResponse;
    chatDuration: number;
}
