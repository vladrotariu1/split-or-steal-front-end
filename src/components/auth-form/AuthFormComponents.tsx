import styled from 'styled-components';
import {
    MAIN_COLOR_GREY,
    TEXT_COLOR_GREEN,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';

export const AuthFormInput = styled.input`
    background-color: ${MAIN_COLOR_GREY};
    border: none;
    box-sizing: border-box;
    color: ${TEXT_COLOR_WHITE};
    font-size: 16px;
    margin-top: 4px;
    padding: 12px 12px;
    width: 100%;

    &:focus {
        border: none;
        outline: none;
    }
`;

export const AuthFormLabel = styled.label<{ $color }>`
    color: ${(props) => props.$color};

    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
`;

export const AuthFormField = styled.div`
    margin-bottom: 12px;
`;

export const AuthButton = styled.button`
    align-self: center;
    background: linear-gradient(to right, #81e0a9, #28814e);
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 500;
    margin-top: 32px;
    padding: 8px;
    width: 200px;

    &:disabled {
        cursor: not-allowed;
        opacity: 70%;
    }
`;

export const AuthFormFooterText = styled.span`
    align-self: center;
    cursor: pointer;
    color: #656565;
    display: block;
    font-size: 12px;
    margin-top: 24px;
    text-decoration: underline;

    &:hover {
        color: ${TEXT_COLOR_GREEN};
    }
`;
