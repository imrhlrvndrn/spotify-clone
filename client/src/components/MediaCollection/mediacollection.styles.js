import styled from 'styled-components';
import { fadeIn } from '../../styledcomponents/animations/animations';
import { colorConversion } from '../../utils';
import { IconImage } from '../Avatar/avatar.styles';

export const MediaCollectionContainer = styled.div`
    margin-top: 1rem;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        margin-top: 2rem;
    }

    .title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
    }

    .wrapper {
        position: relative;
        height: max-content;
        display: flex;
        flex-wrap: ${(props) => (props.mutable ? 'wrap' : 'nowrap')};
        flex-direction: ${(props) => (props.mutable ? 'column' : 'row')};
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;

        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            flex-direction: row;
        }

        &::-webkit-scrollbar {
            width: 0;
        }
    }
`;

export const MediaCard = styled.div`
    min-width: 120px;
    max-width: ${(props) => (props.mutable ? '100%' : '120px')};
    max-height: ${(props) => (props.mutable ? 'auto' : '250px')};
    margin-right: 1rem;
    margin-bottom: ${(props) => (props.mutable ? '1rem' : '0')};
    width: 100%;
    overflow: hidden;
    cursor: pointer;

    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        min-width: 200px;
        max-width: 200px;
        max-height: ${(props) => (props.mutable ? '320px' : '300px')};
        margin-right: 1rem;
        margin-bottom: ${(props) => (props.mutable ? '1rem' : '0')};
        width: 100%;
        height: auto;
        border-radius: 5px;
        transition: 0.4s all ease-in-out;
        padding: 1rem;
        background-color: ${(props) =>
            colorConversion
                ?.convert({ hex: props?.theme?.colors?.background?.secondary })
                ?.hexToRgb()
                ?.rgbToHsl()?.hsl?.text_format};

        &:hover {
            background-color: ${(props) => props?.theme?.colors?.background?.ternary};
        }
    }

    &:last-of-type {
        margin: 0;
    }

    .image_wrapper {
        position: relative;

        img {
            display: block;
            width: ${(props) => (props.mutable ? '60px' : '100%')};
            height: ${(props) => (props.mutable ? '60px' : '100%')};
            margin: ${(props) => (props.mutable ? '0 1rem 0 0' : '0 0 1rem 0')};
            min-height: ${(props) => (props.mutable ? '60px' : '122px')};
            max-height: ${(props) => (props.mutable ? '60px' : '122px')};
            height: auto;
            object-fit: contain;
            @media ${(props) => props.theme.breakpoints.lg_tablet} {
                margin: 0 0 1rem 0;
                min-height: 172px;
                max-height: 172px;
                width: 100%;
                border-radius: 0;
            }

            &.dummy-image {
                width: 100%;
                height: 152px;
            }
        }

        ${IconImage} {
            opacity: 0;
        }
    }

    &:hover ${IconImage} {
        opacity: 1;
        animation: ${fadeIn} 0.4s ease-in-out 1 forward;
    }
`;

export const MediaCardInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
        font-size: 1rem;
        // font-weight: 800;
        margin-bottom: ${(props) => (props.mutable ? '0' : '.5rem')};
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
    }

    p {
        font-size: 0.8rem;
        font-weight: 400;
        text-transform: capitalize;
        opacity: 0.6;
        margin-bottom: ${(props) => (props.mutable ? '0' : '.5rem')};
        @media ${(props) => props.theme.breakpoints.lg_tablet} {
            margin-bottom: 0.5rem;
        }
    }
`;
