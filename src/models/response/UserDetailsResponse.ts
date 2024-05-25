export interface UserDetailsResponse {
    accessToken: string;
    balance: number;
    email: string;
    userId: string;
    userName: string;
    userPhotoUrl: string;
}

export interface ChatUserDetailsResponse
    extends Pick<UserDetailsResponse, 'userId' | 'userName' | 'userPhotoUrl'> {}
