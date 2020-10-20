import styled from 'styled-components';

export default styled.div`
    padding: 0rem 1rem 10rem 1rem;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        padding: 0rem 2rem 10rem 2rem;
    }
`;
