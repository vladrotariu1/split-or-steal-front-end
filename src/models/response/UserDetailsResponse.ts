export interface UserDetailsResponse {
    accessToken: string;
    email: string;
    userId: string;
    userName: string;
    userPhotoUrl: string;
}

export interface ChatUserDetailsResponse
    extends Pick<UserDetailsResponse, 'userId' | 'userName' | 'userPhotoUrl'> {}
