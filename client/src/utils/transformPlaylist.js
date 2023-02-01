export const transformTrackToPlaylist = (trackArray) => {
    let currentPlaylist = trackArray.reduce((acc, cur) => {
        let newSong;
        if (cur?.preview_url !== null)
            newSong = {
                link: cur?.external_urls?.spotify,
                image:
                    cur?.album?.images[2]?.url ||
                    cur?.album?.images[1]?.url ||
                    cur?.album?.images[0]?.url,
                name: cur?.name,
                artists: cur?.album?.artists,
                preview_url: cur?.preview_url,
                mediaType: cur?.type,
            };

        acc.push(newSong);
        return acc;
    }, []);
    return currentPlaylist;
};

const constructMediaObjectForPage = () => {};

export const transformAlbumToPlaylist = (albumData) => {
    let currentPlaylist = albumData?.tracks?.items?.reduce((acc, cur) => {
        let newSong;
        if (cur?.preview_url !== null)
            newSong = {
                link: cur?.external_urls?.spotify,
                image:
                    albumData?.images[2]?.url ||
                    albumData?.images[1]?.url ||
                    albumData?.images[0]?.url,
                name: cur?.name,
                artists: cur?.artists,
                preview_url: cur?.preview_url,
                mediaType: albumData?.type,
            };

        acc.push(newSong);
        return acc;
    }, []);
    return currentPlaylist;
};

export const transformPlaylistToPlaylist = (playlistData) => {
    let currentPlaylist = playlistData?.tracks?.items?.reduce((acc, cur) => {
        let newSong;
        if (cur?.track?.preview_url !== null) {
            newSong = {
                link: cur?.track?.external_urls?.spotify,
                image:
                    cur?.track?.album?.images[2]?.url ||
                    cur?.track?.album?.images[1]?.url ||
                    cur?.track?.album?.images[0]?.url,
                name: cur?.track?.name,
                artists: cur?.track?.artists,
                preview_url: cur?.track?.preview_url,
                mediaType: playlistData?.type,
            };
            acc.push(newSong);
        }
        return acc;
    }, []);
    return currentPlaylist;
};

export const transformArtistToPlaylist = (artistSongsData) => {
    let currentPlaylist = artistSongsData?.tracks?.reduce((acc, cur) => {
        let newSong;
        if (cur?.preview_url !== null) {
            newSong = {
                link: cur?.album?.external_urls?.spotify,
                image:
                    cur?.album?.images[2]?.url ||
                    cur?.album?.images[1]?.url ||
                    cur?.album?.images[0]?.url,
                name: cur?.name,
                artists: cur?.album?.artists,
                preview_url: cur?.preview_url,
                mediaType: 'artist',
            };

            acc.push(newSong);
        }
        return acc;
    }, []);
    return currentPlaylist;
};

export const transformPodcastToPlaylist = (podcastData) => {
    let currentPlaylist = podcastData?.episodes?.items?.reduce((acc, cur) => {
        let newSong;
        if (cur?.audio_preview_url !== null) {
            newSong = {
                link: cur?.external_urls?.spotify,
                image: cur?.images[2]?.url || cur?.images[1]?.url || cur?.images[0]?.url,
                name: cur?.name,
                artists: null,
                preview_url: cur?.audio_preview_url,
                mediaType: podcastData?.type,
            };

            acc.push(newSong);
        }
        return acc;
    }, []);
    return currentPlaylist;
};

export const transformEpisodeToPlaylist = (episodeArray) => {
    let currentPlaylist = episodeArray.reduce((acc, cur) => {
        let newSong;
        if (cur?.audio_preview_url !== null)
            newSong = {
                link: cur?.external_urls?.spotify,
                image: cur?.images[2]?.url || cur?.images[1]?.url || cur?.images[0]?.url,
                name: cur?.name,
                artists: null,
                preview_url: cur?.audio_preview_url,
                mediaType: cur?.type,
            };

        acc.push(newSong);
        return acc;
    }, []);
    return currentPlaylist;
};
