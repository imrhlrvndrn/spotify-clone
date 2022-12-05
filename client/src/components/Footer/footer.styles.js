import styled from 'styled-components';

export const FooterContainer = styled.div`
    position: fixed;
    bottom: 55px;
    height: 80px;
    width: 100%;
    padding: 0;
    background: ${(props) => props?.theme?.colors?.background?.ternary};
    display: flex;
    justify-content: space-between;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        padding: 1rem;
        bottom: 0;
    }
    .footer__left {
        flex: 0.3;
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        @media ${(props) => props.theme.breakpoints.tablet} {
            flex: 1;
        }

        &__albumlogo {
            width: 80px;
            height: 100%;
            margin-right: 1rem;
            @media ${(props) => props.theme.breakpoints.lg_tablet} {
                width: 50px;
                height: 50px;
                border-radius: 5px;
            }
        }

        .song_details {
            &__name {
                font-weight: 600;
                margin-bottom: 0.2rem;
            }

            &__artist {
                font-size: 0.8rem;
            }
        }
    }

    .footer__center {
        flex: 0.4;
        display: flex;
        justify-content: center;
        align-items: center;
        @media ${(props) => props.theme.breakpoints.tablet} {
            flex: 0.2;
        }

        svg {
            margin-right: 2rem;
            transition: 0.2s linear;
            @media ${(props) => props.theme.breakpoints.tablet} {
                display: none;
            }

            &:hover {
                cursor: pointer;
            }

            &:nth-child(3) {
                transform: scale(2);
                @media ${(props) => props.theme.breakpoints.tablet} {
                    display: block;
                    margin-right: 1rem;
                }
            }
        }
    }

    .footer__right {
        flex: 0.3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        @media ${(props) => props.theme.breakpoints.tablet} {
            display: none;
        }

        * {
            margin-left: 1rem;
        }

        input {
            height: 2px;
        }
    }
`;
