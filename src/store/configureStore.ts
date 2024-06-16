import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi.ts';
import {
    currentUserReducer,
    CurrentUserState,
} from './slices/currentUser.slice.ts';
import { infoPopupReducer, InfoPopupState } from './slices/infoPopup.slice.ts';
import { userProfileApi } from './api/userProfileApi.ts';
import { paymentMethodsApi } from './api/paymentMethodsApi.ts';
import {
    gameMetadataReducer,
    GameMetadataState,
} from './slices/gameMetadata.slice.ts';
import { assistantApi } from './api/assistantApi.ts';

export interface RootState {
    currentUser: CurrentUserState;
    infoPopup: InfoPopupState;
    gameMetadata: GameMetadataState;
}

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        infoPopup: infoPopupReducer,
        gameMetadata: gameMetadataReducer,
        [assistantApi.reducerPath]: assistantApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userProfileApi.reducerPath]: userProfileApi.reducer,
        [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // @ts-ignore
        getDefaultMiddleware()
            .concat(assistantApi.middleware)
            .concat(authApi.middleware)
            .concat(userProfileApi.middleware)
            .concat(paymentMethodsApi.middleware),
});

export default store;
