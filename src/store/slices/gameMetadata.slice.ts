import { createSlice } from '@reduxjs/toolkit';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { ChatUserDetailsResponse } from '../../models/response/UserDetailsResponse.ts';
import { Message } from '../../models/models/Message.ts';

export interface GameMetadataState {
    chatMessageList: Message[];
    gamePot: number;
    playerState: PlayerStates;
    usersDetails: ChatUserDetailsResponse[];
}

const initialState: GameMetadataState = {
    chatMessageList: [],
    gamePot: null,
    playerState: PlayerStates.NOT_IN_GAME,
    usersDetails: [],
};

const gameMetadataSlice = createSlice({
    name: 'game-metadata',
    initialState,
    reducers: {
        resetGameMetadata() {
            return {
                ...initialState,
            };
        },
        setGamePot(state, action: { payload: number; type: any }) {
            return {
                ...state,
                gamePot: action.payload,
            };
        },
        setPlayerState(state, action: { payload: PlayerStates; type: any }) {
            return {
                ...state,
                playerState: action.payload,
            };
        },
        setChatUsersDetails(
            state,
            action: { payload: ChatUserDetailsResponse[]; type: any },
        ) {
            return {
                ...state,
                usersDetails: action.payload,
            };
        },
    },
});

export const {
    resetGameMetadata,
    setGamePot,
    setPlayerState,
    setChatUsersDetails,
} = gameMetadataSlice.actions;
export const { reducer: gameMetadataReducer } = gameMetadataSlice;
