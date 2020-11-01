import React from 'react';
import { Link } from 'react-router-dom';

// styled components
import StyledSongTrack from './StyledSongTrack';

const PlaylistSong = ({ trackImg, trackName, trackArtists, episodeDescription, link }) => {
    return (
        <StyledSongTrack>
            <a target='_blank' rel='no-referrer' href={link}>
                <img src={trackImg} alt={trackName} />
                <div className='detailedSong__info'>
                    <h1>
                        #{episodeDescription.episode_count} {trackName}
                    </h1>
                    {trackArtists && <p>{trackArtists.map((artist) => artist.name).join(', ')}</p>}
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
            </a>
        </StyledSongTrack>
    );
};

export default PlaylistSong;
