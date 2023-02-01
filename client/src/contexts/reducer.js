export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    artist_top_tracks: null,
    user_media: {
        savedShows: [],
        saved_albums: [],
        top_artists: [],
        followed_artists: [],
        recentlyPlayedTracks: [],
    },
    playlistId: null,
    media_id: null,
    item: null,
    newReleases: {},
    search: { query: '', results: {} },
    token: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user };

        case 'SET_TOKEN':
            return { ...state, token: action.token };

        case 'SET_PLAYLISTS':
            return { ...state, playlists: action.playlists };

        case 'SET_DISCOVER_WEEKLY':
            return { ...state, discover_weekly: action.discover_weekly };

        case 'SET_ARTIST_TOP_TRACKS':
            return { ...state, artist_top_tracks: action.artist_top_tracks };

        case 'SET_PLAYLIST_ID':
            return { ...state, playlistId: action.playlistId };

        case 'SET_MEDIA_ID':
            return { ...state, media_id: action.media_id };

        case 'SET_NEW_RELEASES':
            return { ...state, newReleases: action.newReleases };

        case 'SET_RECENTLY_PLAYED_TRACKS':
            return {
                ...state,
                user_media: {
                    ...state?.user_media,
                    recentlyPlayedTracks: action.recentlyPlayedTracks,
                },
            };

        case 'SET_SAVED_SHOWS':
            return {
                ...state,
                user_media: { ...state?.user_media, savedShows: action.savedShows },
            };

        case 'SET_SAVED_ALBUMS':
            return {
                ...state,
                user_media: { ...state?.user_media, saved_albums: action.saved_albums },
            };

        case 'SET_FOLLOWED_ARTISTS':
            return {
                ...state,
                user_media: { ...state?.user_media, followed_artists: action.followed_artists },
            };

        case 'SET_SEARCH_QUERY':
            return { ...state, search: { ...state?.search, query: action.query } };

        case 'SET_SEARCH_RESULTS':
            return { ...state, search: { ...state?.search, results: action.results } };

        case 'SET_CURRENT_PLAYING_SONG':
            return { ...state, currentPlayingSong: action.currentPlayingSong };

        case 'SET_CURRENT_PLAYLIST':
            return { ...state, currentPlaylist: action.currentPlaylist };

        default:
            return state;
    }
};

export default reducer;
