import styled, { css } from 'styled-components';
import { IconImage } from '../Avatar/avatar.styles';

export const ButtonWrapper = styled(IconImage)`
    ${(props) =>
        props?.variant === 'card' &&
        css`
            position: absolute;
            bottom: 0.4rem;
            right: 0.4rem;
            transition: 0.4s all ease-in-out;
        `}
`;
