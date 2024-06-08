import styled from 'styled-components';
import { TEXT_COLOR_GREEN } from '../../config/Styles.ts';

export const ProfilePicture = styled.div<{
    $changePhotoActivated: boolean;
    $dimension: number;
    $imageUrl: string;
}>`
    background-image: ${(props) => `url(${props.$imageUrl})`};
    height: ${(props) => `${props.$dimension}px`};
    width: ${(props) => `${props.$dimension}px`};

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 4px solid #868686;
    border-radius: 50%;
    position: relative;

    &:before {
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9);
        border-radius: 50%;
        color: ${TEXT_COLOR_GREEN};
        content: ${(props) =>
            props.$changePhotoActivated ? "'Change photo'" : null};
        cursor: pointer;
        display: flex;
        font-size: 12px;
        height: 100%;
        justify-content: center;
        position: relative;
        opacity: 0;
        transition: 0.5s ease;
        width: 100%;
    }

    &:hover:before {
        opacity: 1;
    }
`;

export const ProfilePictureInput = styled.input`
    cursor: pointer;
    display: block;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

export const ShortUserProfile = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 16px;
`;
