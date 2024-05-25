import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentServiceEndpoint } from '../../config/ServiceEndpointsMap.ts';
import styled from 'styled-components';
import { TEXT_COLOR_GREEN, TEXT_COLOR_WHITE } from '../../config/Styles.ts';

const PaymentSuccessfulWrapper = styled.div``;

const PaymentRechargeMessage = styled.p`
    color: ${TEXT_COLOR_GREEN};
    font-size: 24px;
`;

const PaymentSuccessfulMessage = styled.h1`
    color: ${TEXT_COLOR_WHITE};
    font-size: 48px;
`;

export const PaymentsReturnPage = () => {
    const [status, setStatus] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session-id');

        fetch(
            `${getCurrentServiceEndpoint()}payments/session-status?session-id=${sessionId}`,
        )
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setPaymentAmount(data.paymentAmount);
            });
    }, []);

    if (status === 'open') {
        return <Navigate to="/add-credit" />;
    }

    if (status === 'complete') {
        return (
            <PaymentSuccessfulWrapper>
                <PaymentSuccessfulMessage>
                    Your payment was successful!
                </PaymentSuccessfulMessage>
                <PaymentRechargeMessage>
                    {paymentAmount}$ have been added to your credit
                </PaymentRechargeMessage>
            </PaymentSuccessfulWrapper>
        );
    }

    return null;
};
