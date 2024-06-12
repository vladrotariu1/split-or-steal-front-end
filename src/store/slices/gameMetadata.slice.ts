import { createSlice } from '@reduxjs/toolkit';
import { PlayerStates } from '../../models/enums/PlayerStates.ts';
import { ChatUserDetailsResponse } from '../../models/response/UserDetailsResponse.ts';
import { Message } from '../../models/models/Message.ts';

export interface GameMetadataState {
    chatMessageList: Message[];
    gamePot: number;
    numberOfKillerBalls: number;
    playerState: PlayerStates;
    usersDetails: ChatUserDetailsResponse[];
    timerSeconds: number;
}

const initialState: GameMetadataState = {
    chatMessageList: [],
    numberOfKillerBalls: null,
    gamePot: null,
    playerState: PlayerStates.NOT_IN_GAME,
    usersDetails: [],
    timerSeconds: null,
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
        addMessageToList(state, action: { payload: Message; type: any }) {
            return {
                ...state,
                chatMessageList: [...state.chatMessageList, action.payload],
            };
        },
        setGamePot(state, action: { payload: number; type: any }) {
            return {
                ...state,
                gamePot: action.payload,
            };
        },
        setNumberOfKillerBalls(state, action: { payload: number; type: any }) {
            return {
                ...state,
                numberOfKillerBalls: action.payload,
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
        setTimerSeconds(state, action: { payload: number; type: any }) {
            return {
                ...state,
                timerSeconds: action.payload,
            };
        },
    },
});

export const {
    addMessageToList,
    resetGameMetadata,
    setGamePot,
    setNumberOfKillerBalls,
    setPlayerState,
    setChatUsersDetails,
    setTimerSeconds,
} = gameMetadataSlice.actions;
export const { reducer: gameMetadataReducer } = gameMetadataSlice;
