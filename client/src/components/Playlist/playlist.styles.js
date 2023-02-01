import styled from 'styled-components';
import { colorConversion } from '../../utils';

export const TileContainer = styled.div`
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(1, 1fr);
    }
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
        background-color: ${(props) => props?.theme?.colors?.background?.ternary};
    }

    img {
        width: 80px;
        height: 80px;
    }

    .info {
        flex: 1;
        display: flex;
        padding: 0 1rem;
        align-items: center;
        justify-content: space-between;
    }
`;
