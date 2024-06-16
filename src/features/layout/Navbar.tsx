import {
    NavbarRightContainer,
    NavbarRightContainerElement,
    NavbarWrapper,
} from '../../components/layout/Navbar.tsx';
import { ProfilePicture } from '../../components/shared/ProfilePicture.tsx';
import { DEFAULT_USER_IMAGE_URL } from '../../config/Variables.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    TEXT_COLOR_GREEN,
} from '../../config/Styles.ts';
import { useState } from 'react';

const ProfileDropBarWrapper = styled.ul<{ $display: boolean }>`
    display: ${(props) => (props.$display ? 'block' : 'none')};

    background-color: ${TEXT_COLOR_GREEN};
    border-radius: 4px;
    bottom: -16px;
    cursor: default;
    list-style: none;
    padding-inline-start: 0;
    padding: 8px;
    position: absolute;
    right: 0;
    transform: translateY(100%);

    ::before {
        background-color: ${TEXT_COLOR_GREEN};
        content: '';
        height: 16px;
        position: absolute;
        right: 16px;
        top: -8px;
        transform: rotate(45deg);
        width: 16px;
    }

    :last-child {
        border-bottom: none;
    }
`;

const ProfileDropBarOption = styled.li<{ $disableCursor?: boolean }>`
    cursor: ${(props) => (props.$disableCursor ? 'default' : 'pointer')};

    border-bottom: 1px solid ${MAIN_COLOR_BLUE_MARINE};
    color: ${MAIN_COLOR_BLUE_MARINE};
    font-size: 16px;
    padding: 16px 0;
`;

export const Navbar = () => {
    const { balance, loggedIn, email, userPhotoUrl } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [hoverOnProfile, setHoverOnProfile] = useState(false);

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

    const handleClickGameHistory = () => {
        navigate('/game-history');
    };

    const handleAddCredit = () => {
        navigate('/add-credit');
    };

    return (
        <NavbarWrapper $disableMouseEvents={false}>
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
                        <NavbarRightContainerElement
                            onClick={handleClickGameHistory}
                        >
                            Game history
                        </NavbarRightContainerElement>
                        <NavbarRightContainerElement
                            onMouseEnter={() => setHoverOnProfile(true)}
                        >
                            <ProfilePicture
                                $changePhotoActivated={false}
                                $imageUrl={
                                    userPhotoUrl || DEFAULT_USER_IMAGE_URL
                                }
                                $dimension={32}
                                onClick={handleClickProfile}
                            />
                            <ProfileDropBarWrapper
                                $display={hoverOnProfile}
                                onMouseLeave={() => setHoverOnProfile(false)}
                            >
                                <ProfileDropBarOption $disableCursor={true}>
                                    {email}
                                </ProfileDropBarOption>
                                <ProfileDropBarOption $disableCursor={true}>
                                    Balance: {balance}$
                                </ProfileDropBarOption>
                                <ProfileDropBarOption onClick={handleAddCredit}>
                                    Add credit
                                </ProfileDropBarOption>
                                <ProfileDropBarOption>
                                    Logout
                                </ProfileDropBarOption>
                            </ProfileDropBarWrapper>
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
