import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useCallback } from 'react';
import { getCurrentServiceEndpoint } from '../../config/ServiceEndpointsMap.ts';
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const AddCreditPage = () => {
    const { accessToken } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        return fetch(
            `${getCurrentServiceEndpoint()}payments/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, [accessToken]);

    const options = { fetchClientSecret };
    return (
        accessToken && (
            <div id="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        )
    );
};
