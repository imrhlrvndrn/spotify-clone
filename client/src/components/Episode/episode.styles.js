import styled from 'styled-components';

export const EpisodeTrack = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-top: 2px solid ${(props) => props?.theme?.colors?.background?.ternary};

    img {
        border-radius: 10px;
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin-right: 1rem;
    }
`;

export const EpisodeInfo = styled.div`
    h2 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem !important;
    }

    p {
        font-size: 0.8rem;
        opacity: 0.8;
    }
`;
