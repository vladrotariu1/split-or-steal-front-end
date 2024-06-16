import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../configureStore.ts';
import { getCurrentServiceEndpoint } from '../../config/ServiceEndpointsMap.ts';

export const baseApi = (reducerPath: string) =>
    createApi({
        reducerPath: reducerPath,
        baseQuery: fetchBaseQuery({
            baseUrl: getCurrentServiceEndpoint(),
            prepareHeaders: (headers: Headers, { getState }) => {
                const { accessToken } = (getState() as RootState).currentUser;

                if (accessToken) {
                    headers.set('Authorization', `Bearer ${accessToken}`);
                }
            },
        }),
        endpoints: () => ({}),
    });

export const authBaseApi = baseApi('auth');
export const userProfileBaseApi = baseApi('user-profile');
export const paymentMethodsBaseApi = baseApi('payment-methods');
export const assistantBaseApi = baseApi('assistant');
