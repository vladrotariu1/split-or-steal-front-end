import {
    NavbarRightContainer,
    NavbarRightContainerElement,
    NavbarWrapper,
} from '../../components/layout/Navbar.tsx';
import { ProfilePicture } from '../../components/shared/ProfilePicture.tsx';
import { DEFAULT_USER_IMAGE_URL } from '../../utils/Variables.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { loggedIn, userPhotoUrl } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const navigate = useNavigate();

    const handleClickProfile = () => {
        navigate('/profile');
    };

    const handleClickLogin = () => {
        navigate('/login');
    };

    const handleClickHome = () => {
        navigate('/');
    };

    const handleClickNewGame = () => {
        navigate('/new-game');
    };

    return (
        <NavbarWrapper>
            <NavbarRightContainer>
                <NavbarRightContainerElement onClick={handleClickHome}>
                    Home
                </NavbarRightContainerElement>
                {loggedIn ? (
                    <>
                        <NavbarRightContainerElement
                            onClick={handleClickNewGame}
                        >
                            New Game
                        </NavbarRightContainerElement>
                        <NavbarRightContainerElement>
                            Game history
                        </NavbarRightContainerElement>
                        <NavbarRightContainerElement
                            onClick={handleClickProfile}
                        >
                            <ProfilePicture
                                $changePhotoActivated={false}
                                $imageUrl={
                                    userPhotoUrl || DEFAULT_USER_IMAGE_URL
                                }
                                $dimension={32}
                            />
                        </NavbarRightContainerElement>
                    </>
                ) : (
                    <NavbarRightContainerElement onClick={handleClickLogin}>
                        Log in
                    </NavbarRightContainerElement>
                )}
            </NavbarRightContainer>
        </NavbarWrapper>
    );
};
