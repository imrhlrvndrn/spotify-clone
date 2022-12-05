import styled from 'styled-components';

export const Track = styled.div`
    display: flex;
    color: white;
    border-radius: 5px;
    transition: 0.4s ease-in-out;

    &:hover {
        cursor: pointer;

        .order {
            span {
                display: none;
            }
            svg {
                // Used the important so that the display none below doesn't overwrite this setting
                display: block !important;
            }
        }
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            opacity: 0.8;
            background-color: ${(props) => props?.theme?.colors?.background?.primary};
        }
    }

    .detailedSong {
        display: grid;
        grid-template-columns: 1fr;
        place-items: center;
        grid-gap: 1rem;
        width: 100%;
        padding: 0.5rem 0;
        margin-bottom: 1rem;

        @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
            padding: 1rem;
            margin: 0;
            grid-template-columns: 20px 1fr max-content;
        }

        .order,
        .timestamp {
            display: none;

            @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
                display: block;
                color: ${(props) => props?.theme?.colors?.text?.secondary};
            }
        }

        .order {
            svg {
                display: ${(props) => (props?.active ? 'block' : 'none')};
            }
        }

        img {
            display: none;
            border-radius: 5px;
            object-fit: cover;
            object-position: center;

            @media ${(props) => props.theme.breakpoints.lg_tablet} {
                display: block;
                width: 50px;
                height: 50px;
            }
        }

        .description {
            opacity: 0.6;
        }
    }
`;

export const TrackInfo = styled.div`
    width: 100%;

    h3 {
        font-size: 1rem;
        font-weight: 600;

        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    p > * {
        font-size: 0.8rem;
        color: ${(props) => props?.theme?.colors?.text?.secondary};
        margin-top: 0.5rem;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;
