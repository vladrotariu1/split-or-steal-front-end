import { createSlice } from '@reduxjs/toolkit';

export interface CurrentUserState {
    accessToken: string;
    email: string;
    loggedIn: boolean;
    userId: string;
    userName: string;
    userPhotoUrl: string;
}

const initialState: CurrentUserState = {
    accessToken: '',
    email: '',
    loggedIn: false,
    userId: '',
    userName: '',
    userPhotoUrl: '',
};

const currentUserSlice = createSlice({
    name: 'current-user',
    initialState,
    reducers: {
        updateCurrentUser(
            state,
            action: { payload: Partial<CurrentUserState>; type: any },
        ) {
            return {
                ...state,
                ...action.payload,
                loggedIn: true,
            };
        },
    },
});

export const { updateCurrentUser } = currentUserSlice.actions;
export const { reducer: currentUserReducer } = currentUserSlice;
