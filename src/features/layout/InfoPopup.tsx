// @flow

import { InfoPopupWrapper } from '../../components/layout/InfoPopup.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { PopupTypes } from '../../models/enums/PopupTypes.ts';
import { disableInfoPopup } from '../../store/slices/infoPopup.slice.ts';

export const InfoPopup = () => {
    const { active, type, message } = useSelector(
        (state: RootState) => state.infoPopup,
    );

    const dispatch = useDispatch();

    let emoji = '';
    let borderColor = '';

    switch (type) {
        case PopupTypes.SUCCESS:
            emoji = '✅';
            borderColor = 'green';
            break;
        case PopupTypes.ERROR:
            emoji = '❌';
            borderColor = 'red';
            break;
        default:
            emoji = '📢';
            borderColor = 'black';
    }

    const handleOnAnimationEnd = () => {
        dispatch(disableInfoPopup());
    };

    return (
        <>
            {active && (
                <InfoPopupWrapper
                    $borderColor={borderColor}
                    onAnimationEnd={handleOnAnimationEnd}
                >
                    {emoji + ` ${message} ` + emoji}
                </InfoPopupWrapper>
            )}
        </>
    );
};
