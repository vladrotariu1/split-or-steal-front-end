// @flow

import { CardIcon, ListDisc } from '../../components/shared/Icons.tsx';
import {
    PaymentMethodDetailsWrapper,
    PaymentMethodWrapper,
} from '../../components/payment-methods/PaymentMethodsWrappers.tsx';
import {
    PaymentMethodDetailsList,
    PaymentMethodDetailsListItem,
    PaymentMethodType,
} from '../../components/payment-methods/PaymentMethodComponents.tsx';

interface PaymentMethodProps {
    cardNumber: string;
    expirationDate: string;
}

export const PaymentMethod = ({
    cardNumber,
    expirationDate,
}: PaymentMethodProps) => {
    return (
        <div>
            <PaymentMethodWrapper>
                <CardIcon $dimension={48} />
                <PaymentMethodDetailsWrapper>
                    <PaymentMethodType>Credit card</PaymentMethodType>
                    <PaymentMethodDetailsList>
                        <PaymentMethodDetailsListItem>
                            {`*${cardNumber.slice(-4)}`}
                        </PaymentMethodDetailsListItem>
                        <ListDisc $dimension={4} />
                        <PaymentMethodDetailsListItem>
                            Expires on {expirationDate}
                        </PaymentMethodDetailsListItem>
                    </PaymentMethodDetailsList>
                </PaymentMethodDetailsWrapper>
            </PaymentMethodWrapper>
        </div>
    );
};
