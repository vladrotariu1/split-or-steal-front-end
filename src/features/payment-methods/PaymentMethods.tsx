import { useGetPaymentMethodsQuery } from '../../store/api/paymentMethodsApi.ts';
import { PaymentMethod } from './PaymentMethod.tsx';

export const PaymentMethods = () => {
    const { data } = useGetPaymentMethodsQuery();

    console.log(data);

    return (
        data && (
            <>
                {data.map((paymentMethod) => {
                    return (
                        <PaymentMethod
                            key={paymentMethod.id}
                            cardNumber={paymentMethod.cardNumber}
                            expirationDate={paymentMethod.expiryDate}
                        />
                    );
                })}
            </>
        )
    );
};
