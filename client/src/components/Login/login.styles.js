import styled from 'styled-components';

export const LoginSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: rgb(${(props) => props?.theme?.darkBackground});

    img {
        width: 400px;
        height: auto;
        object-fit: contain !important;

        @media ${(props) => props?.theme?.breakpoints?.tablet} {
            width: 70%;
        }
    }

    a {
        margin-top: 2rem;
        padding: 1rem 2rem;
        border-radius: 30px;
        background-color: rgb(${(props) => props?.theme?.constants?.colorBackground});
        color: ${(props) => props?.theme?.text};
        font-weight: 600;
        text-transform: uppercase;
    }
`;
