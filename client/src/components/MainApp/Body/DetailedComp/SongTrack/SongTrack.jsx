import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../../../DataLayer';

// styled components
import StyledSongTrack from './StyledSongTrack';

import {
    transformAlbumToPlaylist,
    transformArtistToPlaylist,
    transformEpisodeToPlaylist,
    transformPlaylistToPlaylist,
    transformPodcastToPlaylist,
    transformTrackToPlaylist,
} from '../../../../../utils/transformPlaylist';

const PlaylistSong = ({
    trackImg,
    trackName,
    trackArtists,
    episodeDescription,
    link,
    preview_url,
    detailedResponse,
}) => {
    const [{ discover_weekly, currentPlaylist }, dispatch] = useDataLayerValue();
    const [isPlayed, setIsPlayed] = useState(false);

    useEffect(() => {
        if (currentPlaylist?.length)
            dispatch({
                type: 'SET_CURRENT_PLAYING_SONG',
                currentPlayingSong:
                    currentPlaylist[
                        currentPlaylist.findIndex((track) => track?.preview_url === preview_url)
                    ],
            });
    }, [isPlayed]);

    return (
        <StyledSongTrack style={{ cursor: `${preview_url === null ? 'not-allowed' : 'pointer'}` }}>
            <div
                className='detailedSong'
                onClick={() => {
                    if (preview_url !== null) {
                        dispatch({
                            type: 'SET_CURRENT_PLAYLIST',
                            currentPlaylist:
                                detailedResponse?.type === 'track'
                                    ? transformTrackToPlaylist([detailedResponse])
                                    : detailedResponse?.type === 'episode'
                                    ? transformEpisodeToPlaylist([detailedResponse])
                                    : detailedResponse?.type === 'playlist'
                                    ? transformPlaylistToPlaylist(detailedResponse)
                                    : detailedResponse?.type === 'album'
                                    ? transformAlbumToPlaylist(detailedResponse)
                                    : detailedResponse?.tracks
                                    ? transformArtistToPlaylist(detailedResponse)
                                    : detailedResponse?.type === 'show'
                                    ? transformPodcastToPlaylist(detailedResponse)
                                    : [],
                        });
                        setIsPlayed(!isPlayed);
                    }
                }}
            >
                <img src={trackImg} alt={trackName} />
                <div className='detailedSong__info'>
                    <h1>
                        <a target='_blank' rel='no-referrer' href={link}>
                            {episodeDescription?.episode_count &&
                                `#${episodeDescription?.episode_count} `}
                            {trackName}
                        </a>
                    </h1>
                    {trackArtists?.length && (
                        <p>{trackArtists.map((artist) => artist?.name).join(', ')}</p>
                    )}
                    {episodeDescription?.description && (
                        <Link
                            to={`/episode/${episodeDescription?.episodeId}`}
                            className='description'
                        >
                            {episodeDescription?.description?.length > 200
                                ? `${episodeDescription?.description.substring(0, 200)} ...`
                                : episodeDescription?.description}
                        </Link>
                    )}
                </div>
            </div>
        </StyledSongTrack>
    );
};

export default PlaylistSong;
