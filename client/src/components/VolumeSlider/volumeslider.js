import styled from 'styled-components';

export const RangeInput = styled.input.attrs({ type: 'range' })`
    padding: 0;
    height: 5px;
    min-height: 0px;
    appearance: none;
    background: white;
    border-radius: 10px;
    -webkit-appearance: none; /* Override default CSS styles */
    background-color: white;

    ::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: #1db954;
        border-radius: 50%;
        cursor: pointer; /* Cursor on hover */
        transition: 0.3s ease-in-out;
        box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.1);

        &:hover {
            box-shadow: 0 0 0 10px rgba(29, 185, 84, 0.1);
        }

        &:active {
            box-shadow: 0 0 0 15px rgba(29, 185, 84, 0.3);
        }
    }
`;
