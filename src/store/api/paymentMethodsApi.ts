import { paymentMethodsBaseApi } from './baseApi.ts';
import { PaymentMethodResponse } from '../../models/response/PaymentMethodResponse.ts';

const injectedRtkApi = paymentMethodsBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentMethods: builder.query<PaymentMethodResponse[], void>({
            query: () => 'payment-methods',
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as paymentMethodsApi };
export const { useGetPaymentMethodsQuery } = injectedRtkApi;
