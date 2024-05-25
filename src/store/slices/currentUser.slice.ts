import { createSlice } from '@reduxjs/toolkit';

export interface CurrentUserState {
    accessToken: string;
    balance: number;
    email: string;
    loggedIn: boolean;
    userId: string;
    userName: string;
    userPhotoUrl: string;
}

const initialState: CurrentUserState = {
    accessToken: '',
    balance: null,
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
        resetCurrentUser() {
            return {
                ...initialState,
            };
        },
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
        updateUserBalance(state, action: { payload: number; type: any }) {
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        },
    },
});

export const { resetCurrentUser, updateCurrentUser, updateUserBalance } =
    currentUserSlice.actions;
export const { reducer: currentUserReducer } = currentUserSlice;
