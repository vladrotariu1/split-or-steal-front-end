import { CustomText } from '../../components/shared/Text.tsx';
import { TEXT_COLOR_GREEN } from '../../config/Styles.ts';
import { RootState } from '../../store/configureStore.ts';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { formatTimer } from '../../utils/Format.ts';

export const RoundTimer = () => {
    const [remainedTimerSeconds, setRemainedTimerSeconds] = useState(null);

    // eslint-disable-next-line no-undef
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const { timerSeconds } = useSelector(
        (state: RootState) => state.gameMetadata,
    );

    if (!timerSeconds) {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return;
    }

    if (timerSeconds && intervalRef.current === null) {
        setRemainedTimerSeconds(timerSeconds);
        intervalRef.current = setInterval(() => {
            setRemainedTimerSeconds((seconds) =>
                seconds - 1 >= 0 ? seconds - 1 : 0,
            );
        }, 1000);
    }

    return (
        <CustomText $color={TEXT_COLOR_GREEN} $fontSize={72}>
            {' '}
            {formatTimer(remainedTimerSeconds)}{' '}
        </CustomText>
    );
};
