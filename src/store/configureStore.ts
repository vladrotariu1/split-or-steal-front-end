import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi.ts';
import {
    currentUserReducer,
    CurrentUserState,
} from './slices/currentUser.slice.ts';
import { infoPopupReducer, InfoPopupState } from './slices/infoPopup.slice.ts';
import { userProfileApi } from './api/userProfileApi.ts';
import { paymentMethodsApi } from './api/paymentMethodsApi.ts';

export interface RootState {
    currentUser: CurrentUserState;
    infoPopup: InfoPopupState;
}

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        infoPopup: infoPopupReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userProfileApi.reducerPath]: userProfileApi.reducer,
        [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // @ts-ignore
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userProfileApi.middleware)
            .concat(paymentMethodsApi.middleware),
});

export default store;
