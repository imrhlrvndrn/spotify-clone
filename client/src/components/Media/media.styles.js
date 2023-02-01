import styled from 'styled-components';

export const HeroSection = styled.div`
    padding: calc(80px + 1rem) 2rem 6rem 2rem;
`;

export const HeroSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        flex-direction: row;
        align-items: flex-end;
    }

    img {
        min-width: 250px;
        max-width: 250px;
        min-height: 250px;
        max-heigth: 250px;
        margin: 0 auto;
        object-fit: cover;
        box-shadow: 0 4px 60px rgba(0, 0, 0, 0.6);
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            margin: 0 1rem 0 0;
        }
    }
`;

export const MediaHeroContent = styled.div`
    flex: 1;
    align-items: flex-end;
    margin: 1rem auto 0 auto;
    text-align: center;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        text-align: left;
    }

    strong {
        text-transform: uppercase;
        font-size: 0.8rem;
    }

    h4 {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-family: 'Montserrat', sans-serif;
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            font-size: 4rem;
        }
    }
`;
