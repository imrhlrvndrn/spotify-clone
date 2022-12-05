import { useEffect } from 'react';
import { spotifyInstance as spotifyApi } from '../config/spotify';
import { usePlayerContext } from '../contexts';
import { useDataLayerValue } from '../DataLayer';
import {
    modifyAlbums,
    modifyArtists,
    modifyEpisodes,
    modifyPlaylists,
    modifyShows,
    modifyTracks,
    removeDuplicates,
} from '../utils';

export const useSpotifyApi = () => {
    const [
        {
            user,
            token,
            playlists,
            user_media: {
                savedShows,
                saved_albums,
                top_artists,
                followed_artists,
                recentlyPlayedTracks,
            },
            currentPlayingSong,
            newReleases,
            search,
        },
        dispatch,
    ] = useDataLayerValue();
    const [{ queue }, playerDispatch] = usePlayerContext();

    useEffect(() => {
        // if (session) {
        //     if (session.error === 'RefreshAccessTokenError') signIn();

        // }
        spotifyApi.setAccessToken(token);
    }, []);

    const fetchUserMedia = async (activeTab = '') => {
        let userMedia = [];
        switch (activeTab) {
            case 'playlists': {
                userMedia = playlists;
                if (userMedia.length === 0) {
                    await getUserPlaylists();
                }
                break;
            }

            case 'podcasts': {
                userMedia = savedShows;
                if (userMedia.length === 0) {
                    await getMySavedShows();
                }
                break;
            }

            case 'artists': {
                userMedia = { top_artists, followed_artists };
                // if (userMedia.top_artists.length === 0 || userMedia.followed_artists.length === 0) {
                // const [myTopArtists, myFollowedArtists] = await Promise.all([
                //     getMyTopArtists(),
                //     getFollowedArtists(),
                // ]);
                // }
                getFollowedArtists();
                break;
            }

            case 'albums': {
                userMedia = saved_albums;
                if (userMedia.length === 0) {
                    await getMySavedAlbums();
                }
                break;
            }
        }
    };

    const fetchMedia = async ({ media_type, media_id }) => {
        console.log('Params in fetchMedia => ', { media_type, media_id });
        switch (media_type) {
            case 'playlist': {
                const playlist = await getPlaylist(media_id);
                console.log('Playlist in fetchMedia => ', playlist);

                return {
                    type: 'playlist',
                    name: playlist?.name,
                    cover_image: playlist?.images[0]?.url,
                    description: playlist?.description,
                    owner: playlist?.owner,
                    total_tracks: playlist?.tracks?.total,
                    tracks: playlist?.tracks?.items?.map((track) => track?.track),
                };
            }

            case 'track': {
                const track = await getTrack(media_id);

                return {
                    type: 'track',
                    name: track?.name,
                    cover_image: track?.album?.images?.[1]?.url,
                    description: track?.description,
                    owner:
                        track?.artists.length > 1
                            ? { display_name: 'Various artists' }
                            : {
                                  display_name: track?.artists.map((artist) => artist?.name)[0],
                              },
                    total_tracks: 1,
                    tracks: [
                        {
                            id: track?.id,
                            link: track?.external_urls?.spotify,
                            name: track?.name,
                            artists: track?.artists?.map((artist) => ({
                                name: artist?.name,
                                id: artist?.id,
                                type: 'artist',
                            })),
                            album: {
                                name: track?.album?.name,
                                images: track?.album?.images,
                            },
                            preview_url: track?.preview_url,
                            duration_ms: track?.duration_ms,
                        },
                    ],
                };
            }

            case 'album': {
                const album = await getAlbum(media_id);
                console.log('Fetch media => ', album);

                return {
                    type: 'album',
                    name: album?.name,
                    cover_image: album?.images?.[0]?.url,
                    description: '',
                    owner: album?.artists?.map(({ id, display_name: name, type }) => ({
                        id,
                        name,
                        type,
                    })),
                    total_tracks: album?.total_tracks || 0,
                    tracks: album?.tracks?.items?.map((track) => ({
                        id: track?.id,
                        name: track?.name,
                        artists: track?.artists?.map((artist) => ({
                            name: artist?.name,
                            id: artist?.id,
                            type: 'artist',
                        })),
                        album: {
                            name: album?.name,
                            images: album?.images,
                        },
                        preview_url: track?.preview_url,
                        duration_ms: track?.duration_ms,
                    })),
                };
            }

            case 'artist': {
                const artist_details = await getArtist(media_id);
                const { tracks } = await spotifyApi.getArtistTopTracks(artist_details?.id, 'in');

                console.log('Artist details => ', tracks);
                return {
                    type: 'artist',
                    name: artist_details?.name,
                    cover_image: artist_details?.images?.[0]?.url,
                    description: '',
                    owner: null,
                    total_tracks: tracks?.length || 0,
                    tracks: tracks?.map((track) => ({
                        id: track?.id,
                        name: track?.name,
                        artists: track?.artists?.map((artist) => ({
                            name: artist?.name,
                            id: artist?.id,
                            type: 'artist',
                        })),
                        album: {
                            name: track?.album?.name,
                            images: track?.album?.images,
                        },
                        preview_url: track?.preview_url,
                        duration_ms: track?.duration_ms,
                    })),
                };
            }

            case 'show': {
                const show = await getShow(media_id);

                return {
                    type: 'podcast',
                    name: show?.name,
                    cover_image: show?.images[0]?.url,
                    owner: { display_name: show?.publisher },
                    description: show?.description,
                    episodes: show?.episodes?.items?.map((episode) => ({
                        id: episode?.id,
                        name: episode?.name,
                        album: {
                            images: [{ url: episode?.images?.[0]?.url }],
                        },
                        duration_ms: episode?.duration_ms,
                        description: episode?.description,
                        release_date: episode?.release_date,
                        preview_url: episode?.audio_preview_url,
                    })),
                };
            }

            case 'episode': {
                const episode = await getEpisode(media_id);

                console.log('episode data => ', episode);
                return {
                    ...episode?.[0],
                    cover_image: episode?.[0]?.images?.[0]?.url,
                    owner: { display_name: episode?.[0]?.artists?.[0]?.name },
                    description: '',
                    episodes: [
                        {
                            id: episode?.[0]?.id,
                            name: episode?.[0]?.name,
                            album: {
                                images: [{ url: episode?.[0]?.images?.[0]?.url }],
                            },
                            stats: `${episode?.[0]?.artists?.[0]?.name}`,
                            preview_url: episode?.[0]?.preview_url,
                            description: episode?.[0]?.description,
                        },
                    ],
                };
            }

            default:
                break;
        }
    };

    const getMe = () => {
        spotifyApi.getMe().then((user) => {
            dispatch({
                type: 'SET_USER',
                user: {
                    type: 'user',
                    id: user?.id,
                    display_name: user?.display_name,
                    avatar_url: user?.images?.[0]?.url,
                },
            });
        });
    };

    const getShowEpisodes = (showId, ...rest) =>
        spotifyApi.getShowEpisodes(showId, ...rest).then((data) => {
            console.log('Show Episodes => ', data);
            return modifyEpisodes(data?.items);
        });

    const getEpisode = (episodeId, ...rest) =>
        spotifyApi.getEpisode(episodeId, ...rest).then((episode) => modifyEpisodes([episode]));

    const getArtistTracks = (artistId, ...rest) =>
        spotifyApi.getArtistAlbums(artistId, ...rest).then((data) => modifyAlbums(data?.items));

    const getPlaylistTracks = (playlistId, ...rest) =>
        spotifyApi
            .getPlaylistTracks(playlistId, ...rest)
            .then((data) => modifyTracks(data?.items?.map((item) => item?.track)));

    const getAlbumTracks = (albumId, variables, ...rest) =>
        spotifyApi.getAlbumTracks(albumId, ...rest).then((data) => {
            console.log('All the album tracks => ', data);
            return modifyTracks(
                data?.items?.map((track) => ({
                    ...track,
                    album: { images: variables?.images },
                }))
            );
        });

    const getShow = (showId) => spotifyApi.getShow(showId).then((data) => data);

    const getAlbum = (albumId) => spotifyApi.getAlbum(albumId).then((data) => data);

    const getTrack = (trackId) => spotifyApi.getTrack(trackId).then((data) => data);

    const getArtist = (artistId) => spotifyApi.getArtist(artistId).then((data) => data);

    const getPlaylist = (playlistId) => spotifyApi.getPlaylist(playlistId).then((data) => data);

    const getUserPlaylists = () =>
        spotifyApi.getUserPlaylists().then((data) => {
            console.log('user playlists => ', data);
            dispatch({ type: 'SET_PLAYLISTS', playlists: modifyPlaylists(data?.items) });
        });

    const getMySavedShows = () =>
        spotifyApi.getMySavedShows().then((data) =>
            dispatch({
                type: 'SET_SAVED_SHOWS',
                savedShows: modifyShows(data?.items?.map((show) => show?.show)),
            })
        );

    const getMySavedAlbums = () =>
        spotifyApi.getMySavedAlbums().then((data) =>
            //console.log('Users saved albums => ', data)
            dispatch({
                type: 'SET_SAVED_ALBUMS',
                saved_albums: modifyAlbums(data?.items?.map((album) => album?.album)),
            })
        );

    const getMyTopArtists = () =>
        spotifyApi
            .getMyTopArtists()
            .then((data) => dispatch({ type: '', top_artists: modifyArtists(data?.items) }));

    const getFollowedArtists = () =>
        spotifyApi.getFollowedArtists().then((data) =>
            dispatch({
                type: 'SET_FOLLOWED_ARTISTS',
                followed_artists: modifyArtists(data?.artists?.items),
            })
        );

    const getMyRecentlyPlayedTracks = () =>
        spotifyApi.getMyRecentlyPlayedTracks().then((data) => {
            console.log('Recently played => ', data);
            const uniqueRecentlyPlayedTracks = removeDuplicates(
                data.items.map(({ track }) => ({ ...track }))
            );
            console.log('Recently played => ', uniqueRecentlyPlayedTracks);

            dispatch({
                type: 'SET_RECENTLY_PLAYED_TRACKS',
                recentlyPlayedTracks: modifyTracks(uniqueRecentlyPlayedTracks).slice(0, 6),
            });
        });

    const getMyCurrentPlayingTrack = async () => {
        let currentPlayingTrack;
        if (!currentPlayingSong.id) {
            currentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack();
        }

        return new Promise((resolve, reject) => {
            if (!!currentPlayingTrack.body) resolve(currentPlayingTrack);
            reject('Could not fetch current playing track');
        });
    };

    const getNewReleases = () =>
        spotifyApi.getNewReleases().then((data) => {
            console.log('new releases => ', data);
            dispatch({
                type: 'SET_NEW_RELEASES',
                newReleases: modifyAlbums(data?.albums?.items).slice(0, 6),
            });
        });

    const searchMedia = (...restProps) =>
        spotifyApi.search(...restProps).then((data) => {
            console.log('Debounced Search results => ', data);
            dispatch({
                type: 'SET_SEARCH_RESULTS',
                results: {
                    albums: modifyAlbums(data?.albums?.items),
                    artists: modifyArtists(data?.artists?.items),
                    shows: modifyShows(data?.shows?.items),
                    episodes: modifyEpisodes(data?.episodes?.items),
                    tracks: modifyTracks(data?.tracks?.items),
                    playlists: modifyPlaylists(data?.playlists?.items),
                },
            });
            return;
        });

    const getSpotifyAccessToken = () => spotifyApi.getAccessToken();

    return {
        searchMedia,
        getMe,
        getShow,
        getTrack,
        getAlbum,
        getEpisode,
        fetchMedia,
        getPlaylist,
        getNewReleases,
        fetchUserMedia,
        getAlbumTracks,
        getMySavedShows,
        getShowEpisodes,
        getArtistTracks,
        getMySavedAlbums,
        getUserPlaylists,
        getPlaylistTracks,
        getSpotifyAccessToken,
        getMyCurrentPlayingTrack,
        getMyRecentlyPlayedTracks,
    };
};
