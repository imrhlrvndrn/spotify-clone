import styled from 'styled-components';

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: ${(props) => (props.displayUsername ? '0.2rem 1rem 0.2rem 0.2rem' : '0.2rem')};
    border-radius: 30px;
    background-color: rgb(${(props) => props.theme.darkBackground});

    img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        margin-right: ${(props) => (props.displayUsername ? '0.5rem' : '0')};
        border-radius: 50%;
    }
`;

export const IconImage = styled.div`
    display: flex;
    /* cursor: ${(props) => (props.hover ? 'pointer' : 'default')}; */
    justify-content: center;
    align-items: center;
    margin: ${(props) => props.margin || '0'};
    padding: ${(props) => props.padding || '0'};
    width: ${(props) => props.width || 'max-content'};
    height: ${(props) => props.height || 'max-content'};
    border-radius: ${(props) => props.borderRadius || '50%'};
    background-color: ${(props) =>
        props?.background || props?.theme?.colors?.background?.secondary};
    &:hover {
        cursor: ${(props) =>
            props?.disabled ? 'not-allowed' : props?.hover ? 'pointer' : 'default'};
    }
`;
