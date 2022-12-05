import styled from 'styled-components';
import { colorConversion } from '../../utils';
import { IconImage } from '../Avatar/avatar.styles';

export const TileContainer = styled.div`
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export const Tile = styled.div`
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    background-color: ${(props) =>
        colorConversion
            .convert({ hex: props?.theme?.colors?.background?.secondary })
            .hexToRgb()
            .rgbToHsl()?.hsl?.text_format};

    &:hover {
        background: ${(props) => props?.theme?.colors?.background?.ternary};

        ${IconImage} {
            opacity: 1;
            transform: translateY(0);
        }
    }

    img {
        width: 80px;
        height: 80px;
    }

    ${IconImage} {
        opacity: 0;
        transform: translateY(10px);
        transition: 0.4s all ease-in-out;
    }

    .info {
        flex: 1;
        display: flex;
        padding: 0 1rem;
        align-items: center;
        justify-content: space-between;
    }
`;
