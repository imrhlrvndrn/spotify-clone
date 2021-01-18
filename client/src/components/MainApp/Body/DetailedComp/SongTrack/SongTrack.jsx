import { requirePropFactory } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../../../DataLayer';

// styled components
import StyledSongTrack from './StyledSongTrack';

// Dummy image
import DummyImage from '../../../../CollectionContainer/CollectionItem/dummy-image.png';

const PlaylistSong = ({
    trackImg,
    trackName,
    trackArtists,
    episodeDescription,
    link,
    preview_url,
}) => {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();

    return (
        <StyledSongTrack>
            <div
                className='detailedSong'
                onClick={() => {
                    dispatch({
                        type: 'SET_CURRENT_PLAYING_SONG',
                        currentPlayingSong: {
                            image: trackImg || DummyImage,
                            name: trackName,
                            artists: trackArtists,
                            description: episodeDescription || '',
                            mediaType: discover_weekly?.type,
                            preview_url: preview_url,
                        },
                    });
                }}
            >
                {/* <a target='_blank' rel='no-referrer' href={link}> */}
                <img src={trackImg} alt={trackName} />
                <div className='detailedSong__info'>
                    <h1>
                        {episodeDescription?.episode_count &&
                            `#${episodeDescription?.episode_count} `}
                        {trackName}
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
                {/* </a> */}
            </div>
        </StyledSongTrack>
    );
};

export default PlaylistSong;
