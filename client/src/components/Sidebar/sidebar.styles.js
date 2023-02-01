import styled from 'styled-components';

export const SidebarContainer = styled.div`
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.5rem 0;
    height: 60px;
    z-index: 99;
    background: ${(props) => props?.theme?.colors?.background?.primary};

    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        position: relative;
        z-index: 0;
        height: 100vh;
        min-width: 270px;
        max-width: 270px;
        padding: 1rem 1rem calc(80px + 0.5rem) 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    img {
        display: block;
        margin-right: auto;
        padding-left: 1rem;
        width: 80%;
        height: auto;
        object-fit: contain;
    }

    a.logout {
        margin-top: auto;
        width: 100% !important;
        padding: 1rem;
        color: whitesmoke;
        background-color: ${(props) => props?.theme?.colors?.background?.secondary};
        border-radius: 5px;
    }
`;
