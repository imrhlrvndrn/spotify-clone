export const modifyPlaylists = (playlists = []) => {
    return playlists.map(({ id, type, images, name, owner }) => ({
        id: id,
        type: type || 'playlist',
        images: images || [],
        name: name || 'No playlist name',
        artists: [
            {
                type: 'user',
                id: owner?.id,
                name: owner?.display_name || 'Playist owner name',
            },
        ],
    }));
};

export const modifyAlbums = (albums = []) =>
    albums.map(({ id, name, type, images, artists }) => ({
        id,
        name: name || 'Album name',
        type: type || 'album',
        images: images || [],
        artists: artists?.map((artist) => ({
            id: artist?.id,
            name: artist?.name,
            type: artist?.type || 'artist',
        })),
    }));

export const modifyArtists = (artists = []) =>
    artists.map(({ id, name, type, images }) => ({
        id,
        name: name || 'Artist name',
        type: type || 'artist',
        images: images || [],
        artists: [{ id: '', type: 'artist', name: 'Artist' }],
    }));

export const modifyShows = (shows = []) =>
    shows.map(({ id, name, type, images, publisher }) => ({
        id,
        name: name || 'Show name',
        type: type || 'show',
        images: images || [],
        artists: [{ id: '', type: 'publisher', name: publisher }],
    }));

export const modifyEpisodes = (episodes = []) =>
    episodes.map(
        ({
            id,
            name,
            type,
            images,
            description,
            audio_preview_url,
            release_date,
            duration_ms,
        }) => ({
            id,
            description,
            name: name || 'Episode name',
            type: type || 'episode',
            album: { images: images || [] },
            preview_url: audio_preview_url || null,
            artists: [
                {
                    id: '',
                    type: 'episode_time',
                    name: `${release_date} . ${duration_ms}`,
                },
            ],
        })
    );

export const modifyTracks = (tracks = []) =>
    tracks.map(({ id, name, type, album, artists, preview_url }) => ({
        id,
        name: name || 'Track name',
        type: type || 'track',
        preview_url: preview_url || null,
        album: { images: album?.images || [] },
        artists: artists?.map((artist) => ({
            id: artist?.id,
            name: artist?.name || 'Artist name',
            type: artist?.type || 'artist',
        })),
    }));
