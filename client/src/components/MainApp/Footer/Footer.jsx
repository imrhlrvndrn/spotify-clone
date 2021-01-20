import React, { useEffect, useRef, useState } from 'react';
import { useDataLayerValue } from '../../../DataLayer';

// Styled components
import StyledFooter from './StyledFooter';

// Material UI icons
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid, Slider } from '@material-ui/core';

// Images
import DummyImage from '../../CollectionContainer/CollectionItem/dummy-image.png';

const Footer = () => {
    const [{ currentPlayingSong }] = useDataLayerValue();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerControls, setPlayerControls] = useState({
        repeat: 'none',
        volume: 0.5,
    });
    const audioRef = useRef(null);

    // Controls the Play/Pause action
    useEffect(() => {
        if (isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlaying]);

    // Plays the song again when the songtrack is clicked (once the song is finished playing)
    useEffect(() => {
        if (!isPlaying && currentPlayingSong?.preview_url) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentPlayingSong]);

    // Controls the Play/Pause action of other songs when clicked another SongTrack (while a )
    useEffect(() => {
        if (!isPlaying && currentPlayingSong?.name) {
            setIsPlaying(true);
        }
        if (isPlaying) audioRef.current.play();
    }, [currentPlayingSong?.preview_url]);

    const handleRepeatMode = () => {
        if (playerControls.repeat === 'none') {
            setPlayerControls((prev) => ({ ...prev, repeat: 'repeat' }));
        } else if (playerControls.repeat === 'repeat') {
            setPlayerControls((prev) => ({ ...prev, repeat: 'repeat one' }));
        } else {
            setPlayerControls((prev) => ({ ...prev, repeat: 'none' }));
        }
    };

    return (
        <StyledFooter>
            <audio
                onEnded={() => {
                    if (playerControls.repeat === 'repeat one') audioRef.current.play();
                    else if (playerControls.repeat === 'repeat all') return;
                    else setIsPlaying(false);
                }}
                src={currentPlayingSong?.preview_url}
                ref={audioRef}
            ></audio>
            <div className='footer__left'>
                {currentPlayingSong?.image && (
                    <img
                        className='footer__left__albumlogo'
                        src={currentPlayingSong?.image ? currentPlayingSong?.image : DummyImage}
                        alt={currentPlayingSong?.name}
                    />
                )}
                <div className='song_details'>
                    <p className='song_details__name'>{currentPlayingSong?.name}</p>
                    {currentPlayingSong?.artists?.length && (
                        <p className='song_details__artist'>
                            {currentPlayingSong?.artists
                                ?.map((artist) => artist?.name)
                                .join(', ')
                                .substring(0, 25)}
                            ...
                        </p>
                    )}
                </div>
            </div>
            <div className='footer__center'>
                <ShuffleIcon />
                <SkipPreviousIcon />
                {isPlaying ? (
                    <PauseCircleFilledIcon onClick={() => setIsPlaying(false)} />
                ) : (
                    <PlayCircleFilledIcon onClick={() => setIsPlaying(true)} />
                )}
                <SkipNextIcon />
                <RepeatIcon
                    style={{ fill: `${playerControls.repeat === 'repeat' ? '#1DB954' : '#fff'}` }}
                    onClick={handleRepeatMode}
                />
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
