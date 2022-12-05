import React, { useState, useEffect, useRef } from 'react';
import { char_limit, modifyTracks } from '../../utils';
import { useSpotifyApi, /* useTrackInfo,*/ usePlayer } from '../../hooks';
// import { fetchCurrentPlayingTrack } from './player.utils';
// import {
//     themeState,
//     playerControlsState,
//     currentPlayerTrackState,
//     playerQueueState,
// } from '../../recoil';

// styles
// import { Container, Flex, Text } from '../../shared';
// import { TrackImage } from '../Track/track.styles';

import {
    ExtendedPlayerWrapper,
    PlayerContainer,
    PlayerControls,
    PlayerTrack,
    PlayerTrackContent,
    PlayerVolumeControls,
} from './player.styles';
import {
    Down,
    NextIcon,
    PauseIcon,
    PlayerQueueIcon,
    PlayIcon,
    PreviousIcon,
    RepeatDisabledIcon,
    RepeatIcon,
    RepeatOneIcon,
    ShuffleIcon,
    VolumeIcon,
} from '../../react_icons';
import { IconImage } from '../Avatar/avatar.styles';

// components
import { VolumeSlider, MediaHero } from '..';
import { usePlayerContext } from '../../contexts';
// import { useRouter } from 'next/router';

export const Player = () => {
    // const router = useRouter();
    const audioRef = useRef(null);
    // const theme = useRecoilValue(themeState);
    const [playerVariant, setPlayerVariant] = useState('minimal');
    const { controls, skipToNext, queue, skipToPrevious, changeRepeatMode, current_track } =
        usePlayer(audioRef);
    const { getSpotifyAccessToken, getMyCurrentPlayingTrack } = useSpotifyApi();
    // const [currentPlayerTrack, setCurrentPlayerTrack] = useRecoilState(currentPlayerTrackState);
    // const setPlayerQueue = useSetRecoilState(playerQueueState);
    // const setPlayerControls = useSetRecoilState(playerControlsState);
    const [_, playerDispatch] = usePlayerContext();

    const capture_accesibility_actions = () =>
        // This function captures the play/pause event triggered by a remote device
        // such as headphone & updates the play/pause icon
        playerDispatch({
            type: 'UPDATE_CONTROLS',
            payload: {
                is_playing: !audioRef?.current?.paused,
            },
        });

    const togglePlayerVariant = () =>
        setPlayerVariant((prevState) => (prevState === 'minimal' ? 'extended' : 'minimal'));

    useEffect(() => {
        // Modifies the title of the page when a track is being played
        if (current_track?.name && controls?.is_playing)
            document.title = `${current_track?.name} . ${current_track?.artists
                ?.map((artist) => artist?.name)
                .join(', ')}`;
        else document.title = 'Spotify';
    }, [current_track?.name, controls?.is_playing]);

    // const debouncedVolumeAdjust = useCallback(
    //     debounce(async (volume) => {
    //         console.log('Value of volume', volume);
    //     }, 500),
    //     []
    // );

    // const trackInfo = useTrackInfo();

    // console.log('router object => ', router);

    // console.log('Player Queue => ', queue);

    // useEffect(() => {
    //     if (getSpotifyAccessToken() && !currentPlayerTrack?.id) {
    //         getMyCurrentPlayingTrack().then((data) => {
    //             // setPlayerControls((prevState) => ({
    //             //     ...prevState,
    //             //     is_playing: false,
    //             //     volume: 20,
    //             // }));
    //             setPlayerQueue((prevState) => modifyTracks([data?.body?.item]));
    //         });
    //     }
    // }, []);

    // useEffect(() => {
    //     if (playerQueue.length > 0) {
    //         setCurrentPlayerTrack((prevState) =>
    //             prevState?.preview_url
    //                 ? {
    //                       id: current_track?.id,
    //                       preview_url: current_track?.preview_url,
    //                   }
    //                 : {
    //                       id: playerQueue[0]?.id,
    //                       preview_url: playerQueue[0]?.preview_url,
    //                   }
    //         );
    //     }
    // }, [playerQueue]);

    if (!current_track?.id) return null;

    return (
        <>
            {playerVariant === 'minimal' && (
                <MinimalPlayer
                    player_params={{
                        current_track,
                        playerDispatch,
                        controls,
                        skipToNext,
                        skipToPrevious,
                        changeRepeatMode,
                        togglePlayerVariant,
                    }}
                />
            )}
            {playerVariant === 'extended' && (
                <ExtendedPlayer
                    player_params={{
                        current_track,
                        playerDispatch,
                        controls,
                        skipToNext,
                        skipToPrevious,
                        changeRepeatMode,
                        togglePlayerVariant,
                    }}
                />
            )}
            <audio
                onEnded={() => skipToNext()}
                onPause={() => capture_accesibility_actions()}
                onPlay={() => capture_accesibility_actions()}
                ref={audioRef}
                src={current_track?.preview_url}
            ></audio>
        </>
    );
};

const MinimalPlayer = ({ player_params }) => {
    const {
        playerDispatch,
        controls,
        skipToNext,
        skipToPrevious,
        changeRepeatMode,
        current_track,
        togglePlayerVariant,
    } = player_params;
    return (
        <PlayerContainer>
            <PlayerTrack justify='flex-start'>
                <img
                    width='60'
                    height='60'
                    src={current_track?.album?.images?.[0]?.url}
                    alt={current_track?.name}
                    onClick={() => window.innerWidth < 770 && togglePlayerVariant(() => 'extended')}
                />
                <PlayerTrackContent>
                    <h2>{char_limit(current_track?.name, 50)}</h2>
                    <p>
                        {char_limit(
                            current_track?.artists?.map((artist) => artist?.name).join(', '),
                            100
                        )}
                    </p>
                </PlayerTrackContent>
            </PlayerTrack>
            <PlayerControllers
                parameters={{
                    playerDispatch,
                    controls,
                    skipToNext,
                    skipToPrevious,
                    changeRepeatMode,
                }}
            />
            <PlayerVolumeController playerDispatch={playerDispatch} controls={controls} />
        </PlayerContainer>
    );
};

const PlayerControllers = ({ parameters }) => {
    const { playerDispatch, controls, skipToNext, skipToPrevious, changeRepeatMode } = parameters;
    return (
        <PlayerControls>
            <IconImage
                hover
                margin='0 1rem 0 0'
                onClick={() =>
                    playerDispatch({
                        type: 'UPDATE_CONTROLS',
                        payload: {
                            shuffle: !controls?.shuffle,
                        },
                    })
                }
            >
                <ShuffleIcon color={controls?.shuffle ? '#1db954' : 'currentColor'} size={16} />
            </IconImage>
            <IconImage hover margin='0 1rem 0 0' onClick={() => skipToPrevious()}>
                <PreviousIcon size={16} />
            </IconImage>
            <IconImage
                hover
                onClick={() =>
                    playerDispatch({
                        type: 'UPDATE_CONTROLS',
                        payload: {
                            is_playing: !controls?.is_playing,
                        },
                    })
                }
                margin='0 1rem 0 0'
                padding='1rem'
                background='#F4F4F6'
            >
                {controls?.is_playing ? (
                    <PauseIcon size={20} color='#383644' />
                ) : (
                    <PlayIcon size={20} color='#383644' />
                )}
            </IconImage>
            <IconImage hover margin='0 1rem 0 0' onClick={() => skipToNext()}>
                <NextIcon size={16} />
            </IconImage>
            <IconImage hover onClick={() => changeRepeatMode()}>
                {controls?.repeat_mode === 'no_repeat' ? (
                    <RepeatDisabledIcon size={16} />
                ) : controls?.repeat_mode === 'repeat' ? (
                    <RepeatIcon size={16} />
                ) : controls?.repeat_mode === 'repeat_one' ? (
                    <RepeatOneIcon size={16} />
                ) : null}
            </IconImage>
        </PlayerControls>
    );
};

const PlayerVolumeController = ({ controls, playerDispatch }) => {
    return (
        <PlayerVolumeControls>
            <IconImage hover margin='0 1rem 0 0'>
                <PlayerQueueIcon size={20} />
            </IconImage>
            <IconImage margin='0 1rem 0 0'>
                <VolumeIcon size={20} />
            </IconImage>
            <VolumeSlider
                type='range'
                min={0}
                max={100}
                value={controls?.volume}
                onChange={(event) =>
                    playerDispatch({
                        type: 'UPDATE_CONTROLS',
                        payload: {
                            volume: +event?.target?.value,
                        },
                    })
                }
            />
        </PlayerVolumeControls>
    );
};

export const ExtendedPlayer = ({ player_params }) => {
    const {
        current_track,
        playerDispatch,
        controls,
        skipToNext,
        skipToPrevious,
        changeRepeatMode,
        togglePlayerVariant,
    } = player_params;
    /*
        1. Full height & width container
            1. Half container to display track coverimage & name
            2. Half container to display Player controls
    */

    return (
        <ExtendedPlayerWrapper>
            <Down
                className='close_extended_player'
                onClick={() => togglePlayerVariant(() => 'minimal')}
            />
            <MediaHero
                name={current_track?.name || 'Ranjana'}
                type={current_track?.artists?.map(({ name }) => name).join(', ')}
                owner={{
                    display_name:
                        current_track?.artists?.map(({ name }) => name).join(', ') ||
                        'Multiple Artists',
                }}
                cover_image={
                    current_track?.album?.images?.[0]?.url ||
                    'https://i.scdn.co/image/ab67616d0000b273cdf7d1d8ff13c3360a8c033d'
                }
                // total_tracks={current_track?.total_tracks}
            />
            <PlayerControllers
                parameters={{
                    playerDispatch,
                    controls,
                    skipToNext,
                    skipToPrevious,
                    changeRepeatMode,
                }}
            />
            <PlayerVolumeController playerDispatch={playerDispatch} controls={controls} />
        </ExtendedPlayerWrapper>
    );
};
