export const removeDuplicates = (array) => {
    return array.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
};

export const char_limit = (message = '', limit = 100) =>
    `${message.slice(0, limit)}${message.length > limit ? '...' : ''}`;

export {
    transformAlbumToPlaylist,
    transformArtistToPlaylist,
    transformEpisodeToPlaylist,
    transformPlaylistToPlaylist,
    transformPodcastToPlaylist,
    transformTrackToPlaylist,
} from './transformPlaylist';
export { useWindowResize } from './useWindowResize';
export { colorConversion } from './color.utils';
export {
    modifyPlaylists,
    modifyAlbums,
    modifyArtists,
    modifyShows,
    modifyEpisodes,
    modifyTracks,
} from './modifiers';
