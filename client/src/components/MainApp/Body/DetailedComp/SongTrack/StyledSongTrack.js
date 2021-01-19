import styled from 'styled-components';

export default styled.div`
    display: flex;
    color: white;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            opacity: 0.8;
            background-color: rgb(${(props) => props.theme.darkBackground});
        }
    }

    .detailedSong {
        padding: 1rem 0;
        display: flex;
        width: 100%;
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            padding: 1rem;
        }
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        object-fit: cover;
        object-position: center;
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            width: 50px;
            height: 50px;
        }
    }

    .detailedSong__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 1rem;

        h1 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;

            a {
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        p {
            font-size: 0.8rem;
            opacity: 0.6;
        }
    }

    .description {
        opacity: 0.6;
    }
`;
