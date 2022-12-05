import styled from 'styled-components';

export default styled.div`
    position: relative;
    height: 100vh;
    background: ${(props) => props?.theme?.colors?.background?.secondary};
    overflow: auto;
    padding-top: ${({ state, media_types }) => (media_types?.includes(state) ? '0' : '80px')};
    padding-bottom: calc(140px);
    flex: 1;

    @media ${(props) => props?.theme?.breakpoints?.lg_tablet} {
        height: 100vh;
        padding-bottom: calc(80px);
    }
`;
