import React, { useEffect, useState } from 'react';

// styled components
import { Track, TrackInfo } from './mediatrack.styles';

import {
    char_limit,
    transformAlbumToPlaylist,
    transformArtistToPlaylist,
    transformEpisodeToPlaylist,
    transformPlaylistToPlaylist,
    transformPodcastToPlaylist,
    transformTrackToPlaylist,
} from '../../utils';
import { usePlayerContext } from '../../contexts';
import { PauseIcon, PlayIcon } from '../../react_icons';
import { IconImage } from '../Avatar/avatar.styles';

export const MediaTrack = ({ order, track, addMediaTracksToQueue }) => {
    const {
        id,
        name,
        album,
        artists,
        link = `https://open.spotify.com/track/${id}`,
        preview_url,
    } = track;
    const [{ current_track, controls }, playerDispatch] = usePlayerContext();

    const triggerPlayerActions = (action) => {
        if (action === 'play' && preview_url) {
            playerDispatch({
                type: 'UPDATE_CURRENT_TRACK',
                payload: track,
            });
            playerDispatch({
                type: 'UPDATE_CONTROLS',
                payload: { is_playing: true },
            });
            addMediaTracksToQueue();
        } else if (action === 'pause') {
            playerDispatch({
                type: 'UPDATE_CONTROLS',
                payload: { is_playing: false },
            });
        }
    };

    const renderTrackPlayStatus = () =>
        id === current_track?.id && controls?.is_playing ? (
            <IconImage onClick={() => triggerPlayerActions('pause')}>
                <PauseIcon size={18} color='#1db954' />
            </IconImage>
        ) : (
            <>
                <span style={{ color: id === current_track?.id && '#1db954' }}>{order}</span>
                <IconImage onClick={() => triggerPlayerActions('play')}>
                    <PlayIcon size={18} />
                </IconImage>
            </>
        );

    const setTrackColor = () => (id === current_track?.id ? '#1db954' : '');

    useEffect(() => {}, [current_track?.id, controls?.is_playing]);

    return (
        <Track
            style={{ cursor: `${preview_url === null ? 'not-allowed' : 'pointer'}` }}
            active={id === current_track?.id && controls?.is_playing}
        >
            <div
                className='detailedSong'
                onDoubleClick={() => {
                    if (preview_url) {
                        playerDispatch({
                            type: 'UPDATE_CURRENT_TRACK',
                            payload: track,
                        });
                        playerDispatch({
                            type: 'UPDATE_CONTROLS',
                            payload: { is_playing: true },
                        });
                        addMediaTracksToQueue();
                    }
                }}
            >
                <p className='order'>{renderTrackPlayStatus()}</p>
                <TrackInfo active>
                    <h3>
                        <a
                            target='_blank'
                            rel='no-referrer'
                            href={link}
                            style={{ color: setTrackColor() }}
                        >
                            {char_limit(name, 50)}
                        </a>
                    </h3>
                    <p>
                        {artists?.map((artist) => {
                            return (
                                <a target='_blank' rel='no-referrer' href={`/artist/${artist?.id}`}>
                                    {char_limit(artist?.name, 30)}
                                </a>
                            );
                        })}
                    </p>
                </TrackInfo>
                <div className='timestamp'>3:14</div>
            </div>
        </Track>
    );
};
