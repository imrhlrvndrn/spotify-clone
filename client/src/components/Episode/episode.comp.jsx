import React from 'react';
import { usePlayerContext } from '../../contexts';
import { EpisodeInfo, EpisodeTrack } from './episode.styles';

export const Episode = ({ episode, addMediaTracksToQueue }) => {
    const [_, playerDispatch] = usePlayerContext();

    return (
        <EpisodeTrack
            onClick={() => {
                playerDispatch({
                    type: 'UPDATE_CURRENT_TRACK',
                    payload: episode,
                });
                playerDispatch({
                    type: 'UPDATE_CONTROLS',
                    payload: { is_playing: true },
                });
                addMediaTracksToQueue();
            }}
        >
            <img src={episode?.album?.images?.[0]?.url} alt={episode?.name} />
            <EpisodeInfo>
                <h2>{episode?.name}</h2>
                <p>{episode?.description?.substring(0, 250)}</p>
                <div className='actions'>
                    <p>{episode?.stats || episode?.release_date || 'Sep 12 . 48min 50sec'}</p>
                </div>
            </EpisodeInfo>
        </EpisodeTrack>
    );
};
