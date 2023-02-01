import styled from 'styled-components';

export default styled.div`
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5rem 1rem;
    background-color: transparent;
    justify-content: space-between;
    z-index: 2;
    overflow: hidden;
    @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
        padding: 1rem 2rem;
        backdrop-filter: blur(10px);
    }

    .header__left {
        display: flex;
        flex: 0.9;
        @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
            flex: 0.5;
        }

        &__historyBtns {
            flex: 0.2;
            display: flex;
            align-items: center;
            width: max-content;
            margin-right: 1rem;

            svg {
                background-color: ${(props) => props?.theme?.colors?.background?.primary};
                border-radius: 50%;
                padding: 0.5rem;
                fill: ${(props) => props?.theme?.colors?.text?.primary};

                &:first-child {
                    margin-right: 0.2rem;
                }

                &:hover {
                    cursor: pointer;
                    transition: 0.4s ease-in-out;
                    background-color: ${(props) => props?.theme?.colors?.background?.ternary};
                }
            }
        }

        &__searchbar {
            flex: 1;
            min-width: 70px;
            background-color: white;
            color: rgb(${(props) => props.theme.text});
            border-radius: 30px;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            @media ${(props) => props.theme.breakpoints.lg_tablet} {
                flex: 0.8;
            }

            svg {
                fill: rgb(${(props) => props.theme.icon});
            }

            input {
                color: rgb(${(props) => props.theme.darkBackground});
                width: 100%;
            }
        }

        &__librarybar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            a {
                display: block;
                margin-right: 1rem;
                padding: 0.8rem 1rem;
                text-transform: capitalize;
                transition: 0.4s ease-in-out;

                &.active {
                    padding: 0.8rem 1rem;
                    border-radius: 5px;
                    background-color: rgb(${(props) => props.theme.darkBackground});
                }
            }
        }
    }

    .header__right {
        display: flex;
        align-items: center;
    }
`;
