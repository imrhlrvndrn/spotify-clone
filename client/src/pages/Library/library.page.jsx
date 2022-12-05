import React, { useEffect } from 'react';
import { spotifyInstance } from '../../config/spotify';
import { useDataLayerValue } from '../../DataLayer';
import { useWindowResize } from '../../utils';

// React components
import { MediaCollection, MediaCollectionCard } from '../../components';
import { useSpotifyApi } from '../../hooks';

export const Library = ({ match }) => {
    const [
        {
            playlists,
            user_media: { followed_artists, saved_albums, savedShows },
            token,
        },
        dispatch,
    ] = useDataLayerValue();
    const { fetchUserMedia } = useSpotifyApi();
    const libraryState = match?.params?.libraryState;
    const windowSize = useWindowResize();
    const windowSizeCalc = windowSize.width >= 1024;

    useEffect(() => {
        (async () => await fetchUserMedia(libraryState))();
        // spotifyInstance.setAccessToken(token);
        // switch (libraryState) {
        //     case 'playlists':
        //         spotifyInstance.getUserPlaylists().then((res) => {
        //             dispatch({ type: 'SET_PLAYLISTS', playlists: res });
        //         });
        //         break;
        //     case 'podcasts':
        //         spotifyInstance.getMySavedShows().then((res) => {
        //             dispatch({ type: 'SET_SAVED_SHOWS', savedShows: res });
        //         });
        //         break;
        //     case 'artists':
        //         spotifyInstance.getFollowedArtists().then((res) => {
        //             dispatch({ type: 'SET_FOLLOWED_ARTISTS', followed_artists: res.artists });
        //         });
        //         break;
        //     case 'albums':
        //         spotifyInstance.getMySavedAlbums().then((res) => {
        //             dispatch({ type: 'SET_SAVED_ALBUMS', saved_albums: res });
        //         });
        //         break;
        //     default:
        //         break;
        // }
    }, [libraryState]);

    console.log('Followed playlits => ', playlists);

    return (
        <div style={{ padding: windowSizeCalc ? '0 2rem 10rem 2rem' : '0 1rem 10rem 1rem' }}>
            {libraryState === 'playlists' && playlists?.length > 0 && (
                <MediaCollection mutable title='Playlists'>
                    {playlists?.map((item) => (
                        <MediaCollectionCard
                            mutable
                            onClick={() => {
                                dispatch({ type: 'SET_MAINAPPSTATE', state: 'playlist' });
                                dispatch({ type: 'SET_PLAYLIST_ID', playlistId: item.id });
                            }}
                            link={`/playlist/${item.id}`}
                            name={item?.name}
                            image={item?.images[0]?.url}
                            artist={item?.owner?.display_name}
                            type={item?.type}
                        />
                    ))}
                </MediaCollection>
            )}

            {libraryState === 'podcasts' && savedShows?.length > 0 && (
                <MediaCollection mutable title='Podcasts'>
                    {savedShows?.map((item) => (
                        <MediaCollectionCard
                            mutable
                            // onClick={() => {
                            //     dispatch({ type: 'SET_MAINAPPSTATE', state: 'show' });
                            //     dispatch({ type: 'SET_PLAYLIST_ID', playlistId: item.show.id });
                            // }}
                            link={`/show/${item?.id}`}
                            name={item?.name}
                            image={item?.images[0]?.url}
                            artist={item?.name}
                            type={item?.type}
                        />
                    ))}
                </MediaCollection>
            )}

            {libraryState === 'artists' && followed_artists?.length > 0 && (
                <MediaCollection mutable title='Artists'>
                    {followed_artists?.map((item) => (
                        <MediaCollectionCard
                            mutable
                            // onClick={() => {
                            //     dispatch({ type: 'SET_MAINAPPSTATE', state: 'show' });
                            //     dispatch({ type: 'SET_PLAYLIST_ID', playlistId: item.show.id });
                            // }}
                            link={`/artist/${item.id}`}
                            name={item?.name}
                            image={item?.images[0]?.url}
                            type={item.type}
                            enableType
                        />
                    ))}
                </MediaCollection>
            )}

            {libraryState === 'albums' && saved_albums?.length > 0 && (
                <MediaCollection mutable title='Albums'>
                    {saved_albums?.map((item) => (
                        <MediaCollectionCard
                            mutable
                            // onClick={() => {
                            //     dispatch({ type: 'SET_MAINAPPSTATE', state: 'show' });
                            //     dispatch({ type: 'SET_PLAYLIST_ID', playlistId: item.show.id });
                            // }}
                            link={`/album/${item?.id}`}
                            name={item?.name}
                            image={item?.images[0]?.url}
                            artist={item?.artists.map((artist) => artist.name).join(', ')}
                            type={item?.type}
                        />
                    ))}
                </MediaCollection>
            )}
        </div>
    );
};
