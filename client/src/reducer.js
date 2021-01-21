export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    artist_top_tracks: null,
    savedShows: {},
    saved_albums: {},
    followed_artists: {},
    playlistId: null,
    detailedId: null,
    playing: false,
    item: null,
    newReleases: {},
    recentlyPlayedTracks: {},
    searchQuery: '',
    searchResults: {},
    currentPlayingSong: {},
    currentPlaylist: [],
    // ! Remove the token after development
    token:
        'BQDGXwNzr5FC0G9KwheeiyWredJwgMNG5LkjbtYMMHMrxMUrEmqIOrPTwN6cXTrEn2LsJMNwWdLWQI9_GZd6x33aPteyUIq8WiISmAVmQagqkqAAu_U6aKWukHYTq-z6rbCkNGYgm28_vdRh0RRllUOq2gG810J-5_GeD4icWGxfYjtCIhqRqYfLeiprSA',
};

const reducer = (state, action) => {
    console.log(action);

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

        case 'SET_DETAILED_ID':
            return { ...state, detailedId: action.detailedId };

        case 'SET_NEW_RELEASES':
            return { ...state, newReleases: action.newReleases };

        case 'SET_RECENTLY_PLAYED_TRACKS':
            return { ...state, recentlyPlayedTracks: action.recentlyPlayedTracks };

        case 'SET_SAVED_SHOWS':
            return { ...state, savedShows: action.savedShows };

        case 'SET_SAVED_ALBUMS':
            return { ...state, saved_albums: action.saved_albums };

        case 'SET_FOLLOWED_ARTISTS':
            return { ...state, followed_artists: action.followed_artists };

        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.searchQuery };

        case 'SET_SEARCH_QUERY_RESULTS':
            return { ...state, searchResults: { ...action.searchResults } };

        case 'SET_CURRENT_PLAYING_SONG':
            return { ...state, currentPlayingSong: action.currentPlayingSong };

        case 'SET_CURRENT_PLAYLIST':
            return { ...state, currentPlaylist: action.currentPlaylist };

        default:
            return state;
    }
};

export default reducer;
