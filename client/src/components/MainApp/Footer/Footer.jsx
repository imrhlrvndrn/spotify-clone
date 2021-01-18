import React, { useEffect, useRef, useState } from 'react';

// Styled components
import StyledFooter from './StyledFooter';

// Material UI icons
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from '../../../DataLayer';

const Footer = () => {
    const [{ currentPlayingSong }] = useDataLayerValue();
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlaying, currentPlayingSong?.name]);

    console.log(audioRef);

    return (
        <StyledFooter>
            <audio
                onEnded={() => setIsPlaying(false)}
                src={currentPlayingSong?.preview_url}
                ref={audioRef}
            ></audio>
            <div className='footer__left'>
                <img
                    className='footer__left__albumlogo'
                    src={currentPlayingSong?.image}
                    alt={currentPlayingSong?.name}
                />
                <div className='song_details'>
                    <p className='song_details__name'>{currentPlayingSong?.name}</p>
                    <p className='song_details__artist'>
                        {currentPlayingSong?.artists
                            ?.map((artist) => artist?.name)
                            .join(', ')
                            .substring(0, 25)}
                        ...
                    </p>
                </div>
            </div>
            <div className='footer__center'>
                <ShuffleIcon />
                <SkipPreviousIcon />
                {isPlaying ? (
                    <PauseCircleOutlineIcon onClick={() => setIsPlaying(false)} />
                ) : (
                    <PlayCircleOutlineIcon onClick={() => setIsPlaying(true)} />
                )}
                <SkipNextIcon />
                <RepeatIcon />
            </div>
            <div className='footer__right'>
                <PlaylistPlayIcon />
                <VolumeDownIcon />
                {/* <Slider /> */}
            </div>
        </StyledFooter>
    );
};

export default Footer;
