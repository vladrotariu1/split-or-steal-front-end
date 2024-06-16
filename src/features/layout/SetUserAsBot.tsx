import { useDispatch } from 'react-redux';
import { setIsUserBot } from '../../store/slices/currentUser.slice.ts';
import { useNavigate } from 'react-router-dom';

export const SetUserAsBot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(setIsUserBot(true));

    navigate('/');

    return <></>;
};
