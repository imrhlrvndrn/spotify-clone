import styled from 'styled-components';

export const HomePage = styled.div`
    padding: 0 1rem 2rem 1rem;
    @media ${(props) => props.theme.breakpoints.lg_tablet} {
        padding: 0 2rem 2rem 2rem;
    }
`;
