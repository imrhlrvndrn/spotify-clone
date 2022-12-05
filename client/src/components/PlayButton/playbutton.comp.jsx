import React from 'react';
import { usePlayerContext } from '../../contexts';
import { PlayIcon } from '../../react_icons';

// styles
import { ButtonWrapper } from './playbutton.styles';

const PlayButton = ({ variant, media }) => {
    const [_, playerDispatch] = usePlayerContext();

    return (
        <ButtonWrapper
            variant={variant}
            padding='1rem'
            background='#1db954'
            onClick={(event) => {
                event.stopPropagation();
                console.log('Clicked Play Button');
                playerDispatch({
                    type: 'UPDATE_QUERY',
                    payload: {
                        id: media?.id,
                        type: media?.type,
                        variables: media?.variables,
                    },
                });
            }}
        >
            <PlayIcon />
        </ButtonWrapper>
    );
};

export default PlayButton;
