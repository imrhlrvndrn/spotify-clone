import React, { useEffect, useRef, useState } from 'react';
import { spotifyInstance } from '../../../../config/spotify';
import { useDataLayerValue } from '../../../../DataLayer';
import useWindowSize from '../../../../utils/useWindowSize';

// Styled components
import StyledDetailedComp from './StyledDetailedComp';

// Material icons
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// React componets
import SongTrack from './SongTrack/SongTrack.jsx';

const Playlist = ({ match, mainAppState }) => {
    const [{ discover_weekly, detailedId, artist_top_tracks }, dispatch] = useDataLayerValue();
    const [isPlaying, setIsPlaying] = useState(false);
    let audio = new Audio(discover_weekly?.preview_url);
    //? It can be anything an album, show, playlist, etc
    const _detailedId = detailedId;
    const windowSize = useWindowSize();
    const windowSizeCalc = windowSize.width >= 1024;
    const windowSizeCalcLt = windowSize.width <= 1024;

    useEffect(() => {
        dispatch({ type: 'SET_DETAILED_ID', detailedId: match.params.id });
        switch (mainAppState) {
            case 'playlist':
                spotifyInstance.getPlaylist(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });
                });
                break;

            case 'album':
                spotifyInstance.getAlbum(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });
                });
                break;

            case 'track':
                spotifyInstance.getTrack(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });
                });
                break;

            case 'artist':
                spotifyInstance.getArtist(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });

                    spotifyInstance.getArtistTopTracks(_detailedId, 'US').then((res) => {
                        dispatch({ type: 'SET_ARTIST_TOP_TRACKS', artist_top_tracks: res });
                    });
                });
                break;

            case 'show':
                spotifyInstance.getShow(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });
                });
                break;

            case 'episode':
                spotifyInstance.getEpisode(_detailedId).then((response) => {
                    dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly: response });
                });
                break;

            default:
                break;
        }
    }, [_detailedId, mainAppState]);

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    console.log('detailed app data', discover_weekly);
    console.log('artist top tracks', artist_top_tracks);
    console.log(mainAppState);

    return (
        <StyledDetailedComp>
            {/* For Playlist */}
            {mainAppState === 'playlist' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.images
                                    ? discover_weekly?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt={discover_weekly?.name}
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && <strong>PLAYLIST</strong>}
                            <h4>{discover_weekly?.name}</h4>
                            {windowSizeCalc && <p>{discover_weekly?.tracks?.items.length} songs</p>}
                            {windowSizeCalcLt && (
                                <p
                                    style={{
                                        textTransform: 'uppercase',
                                        fontSize: '.8rem',
                                        fontWeight: '600',
                                        marginTop: '.5rem',
                                    }}
                                >
                                    By {discover_weekly?.owner?.display_name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>
                        {discover_weekly?.tracks?.items?.length > 0 &&
                            discover_weekly?.tracks?.items.map((item) => {
                                if (item?.track === null) return null;

                                return (
                                    <SongTrack
                                        link={item?.track?.external_urls?.spotify}
                                        trackImg={item?.track?.album?.images[0]?.url}
                                        trackName={item?.track?.name}
                                        trackArtists={item?.track?.artists}
                                        preview_url={item?.track?.preview_url}
                                    />
                                );
                            })}
                    </div>
                </>
            )}

            {/* For Album */}
            {mainAppState === 'album' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.images
                                    ? discover_weekly?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt={discover_weekly?.name}
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && (
                                <strong>{discover_weekly?.type.toUpperCase()}</strong>
                            )}
                            <h4>{discover_weekly?.name}</h4>
                            {windowSizeCalc && (
                                <p>{discover_weekly?.tracks?.items?.length} songs</p>
                            )}
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>
                        {discover_weekly?.tracks?.items?.length > 0 &&
                            discover_weekly?.tracks?.items.map((item) => (
                                <SongTrack
                                    link={item?.external_urls?.spotify}
                                    trackImg={discover_weekly?.images[0]?.url}
                                    trackName={item?.name}
                                    trackArtists={item?.artists}
                                    preview_url={item?.preview_url}
                                />
                            ))}
                    </div>
                </>
            )}

            {/* For Track */}
            {mainAppState === 'track' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.album
                                    ? discover_weekly?.album?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt={discover_weekly?.name}
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && (
                                <strong>{discover_weekly?.type.toUpperCase()}</strong>
                            )}
                            <h4>{discover_weekly?.name}</h4>
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>
                        <SongTrack
                            link={discover_weekly?.external_urls?.spotify}
                            trackImg={discover_weekly?.album?.images[0]?.url}
                            trackName={discover_weekly?.name}
                            trackArtists={discover_weekly?.album?.artists}
                            preview_url={discover_weekly?.preview_url}
                        />
                    </div>
                </>
            )}

            {/* For Artist */}
            {mainAppState === 'artist' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.images
                                    ? discover_weekly?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt=''
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && <strong>Verified artist</strong>}
                            <h4>{discover_weekly?.name}</h4>
                            <p>
                                {new Intl.NumberFormat().format(discover_weekly?.followers?.total)}{' '}
                                monthly listeners
                            </p>
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>

                        {artist_top_tracks?.tracks?.length > 0 &&
                            artist_top_tracks?.tracks?.map((item) => (
                                <SongTrack
                                    link={item?.album?.external_urls?.spotify}
                                    trackImg={item?.album?.images[0]?.url}
                                    trackName={item?.album?.name}
                                    trackArtists={item?.album?.artists}
                                />
                            ))}
                    </div>
                </>
            )}

            {/* For podcast */}
            {mainAppState === 'show' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.images
                                    ? discover_weekly?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt={discover_weekly?.name}
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && <strong>PODCAST</strong>}
                            <h4>{discover_weekly?.name}</h4>
                            <p>{discover_weekly?.publisher}</p>
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>

                        <h1>All Episodes</h1>
                        {discover_weekly?.episodes?.items?.length > 0 &&
                            discover_weekly?.episodes?.items.map((item, index) => (
                                <SongTrack
                                    link={item?.external_urls?.spotify}
                                    trackImg={item?.images[0]?.url}
                                    trackName={item?.name}
                                    episodeDescription={{
                                        description: item?.description,
                                        episodeId: item?.id,
                                        episode_count:
                                            +discover_weekly?.episodes?.items?.length - +index,
                                    }}
                                    preview_url={item?.audio_preview_url}
                                />
                            ))}
                    </div>
                </>
            )}

            {/* For episode */}
            {mainAppState === 'episode' && (
                <>
                    <div className='detailed__info'>
                        <img
                            src={
                                discover_weekly?.images
                                    ? discover_weekly?.images[0]?.url
                                    : 'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                            }
                            alt={discover_weekly?.name}
                        />
                        <div className='detailed__info__text'>
                            {windowSizeCalc && <strong>EPISODE</strong>}
                            <h4>{discover_weekly?.name}</h4>
                        </div>
                    </div>

                    <div className='detailed__songs'>
                        <div className='detailed__songs__icons'>
                            <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                                <PlayCircleFilledIcon className='detailed__shuffle' />
                            </a>
                            <FavoriteIcon fontSize='large' />
                            <MoreHorizIcon />
                        </div>

                        <SongTrack
                            link={discover_weekly?.external_urls?.spotify}
                            trackImg={discover_weekly?.images[0]?.url}
                            trackName={discover_weekly?.name}
                            episodeDescription={{
                                description: discover_weekly?.description,
                                episodeId: discover_weekly?.id,
                            }}
                            preview_url={discover_weekly?.audio_preview_url}
                        />
                    </div>
                </>
            )}
        </StyledDetailedComp>
    );
};

export default Playlist;
