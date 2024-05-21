import { createSlice } from '@reduxjs/toolkit';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';

export interface InfoPopupState {
    active: boolean;
    message: string;
    type: PopupTypes.SUCCESS | PopupTypes.ERROR;
}

const initialState: InfoPopupState = {
    active: false,
    message: '',
    type: null,
};

const infoPopupSlice = createSlice({
    name: 'info-popup',
    initialState,
    reducers: {
        activateInfoPopup(
            state,
            action: { payload: Partial<InfoPopupState>; type: any },
        ) {
            return { ...state, ...action.payload, active: true };
        },

        disableInfoPopup(state) {
            state.active = false;
        },
    },
});

export const { activateInfoPopup, disableInfoPopup } = infoPopupSlice.actions;
export const { reducer: infoPopupReducer } = infoPopupSlice;
