import styled from 'styled-components';
import { IconImage } from '../Avatar/avatar.styles';

export const PlayerTrack = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
    }
`;

export const PlayerTrackContent = styled.div`
    padding-left: 1rem;

    h2 {
        font-weight: 400;
    }

    p {
        font-size: 0.8rem;
        opacity: 0.6;
    }
`;

export const PlayerControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PlayerVolumeControls = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ExtendedPlayerWrapper = styled.div`
    height: calc(100vh - 60px);
    width: 100%;
    background: ${(props) => props?.theme?.colors?.background?.primary};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props?.theme?.colors?.background?.ternary};

    @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
        top: 50%;
        left: 50%;
        width: 70%;
        border: none;
        overflow: hidden;
        border-radius: 10px;
        height: max-content;
        transform: translate(-50%, -50%);
        display: none;
    }

    .close_extended_player {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        background-color: black;
        width: 40px;
        height: 40px;
        padding: 0.7rem;
        border-radius: 50%;

        &:hover {
            cursor: pointer !important;
            background-color: ${(props) => props?.theme?.colors?.background?.ternary};
        }
    }

    ${PlayerControls} {
        margin-top: auto;
        margin-bottom: 1rem;
        justify-content: space-around;

        svg {
            size: 50px;
        }
    }

    ${PlayerVolumeControls} {
        margin: 1rem 0;
        width: 100%;
        padding: 0 1rem;
        justify-content: space-around;

        input {
            width: 70%;
        }
    }
`;

export const PlayerContainer = styled.div`
    height: 80px;
    left: 0;
    gap: 1rem;
    bottom: 0;
    z-index: 2;
    width: 100%;
    display: grid;
    padding: 0 1rem;
    position: absolute;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    background: ${(props) => props?.theme?.colors?.background?.secondary};
    border-top: 2px solid ${(props) => props?.theme?.colors?.background?.ternary};

    @media ${(props) => props?.theme?.breakpoints?.tablet} {
        border-radius: 10px;
        bottom: calc(60px + 0.5rem);
        display: flex;
        justify-content: space-between;
        width: calc(100% - 2rem);
        left: 50%;
        transform: translate(-50%, 0);
        background: ${(props) => props?.theme?.colors?.background?.ternary};
    }

    ${PlayerVolumeControls} {
        @media ${(props) => props?.theme?.breakpoints?.tablet} {
            display: none;
        }
    }

    ${PlayerControls} {
        @media ${(props) => props?.theme?.breakpoints?.tablet} {
            justify-content: flex-end;

            ${IconImage} {
                margin: 0;

                &:not(:nth-child(3)) {
                    display: none;
                }
            }
        }
    }
`;
