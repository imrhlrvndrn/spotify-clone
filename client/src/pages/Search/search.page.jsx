import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { spotifyInstance } from '../../config/spotify';

// Styled components
import { SearchPage } from './search.styles';

// components
import {
    TrackCollection,
    ArtistCollection,
    AlbumCollection,
    PlaylistCollection,
    EpisodeCollection,
    PodcastCollection,
} from '../../components';
import { useSpotifyApi } from '../../hooks';

export const Search = () => {
    const [
        {
            search: { query, results },
        },
        dispatch,
    ] = useDataLayerValue();
    const { searchMedia } = useSpotifyApi();

    useEffect(() => {
        // spotifyInstance
        //     .search(query, ['album', 'track', 'artist', 'playlist', 'show', 'episode'], {
        //         limit: 6,
        //     })
        //     .then((response) => {
        //         dispatch({ type: 'SET_SEARCH_RESULTS', results: response });
        //     });
        searchMedia(query, ['album', 'track', 'artist', 'playlist', 'show', 'episode'], {
            limit: 6,
        });
    }, [query]);
    console.log('search query results: ', results);

    return (
        <SearchPage>
            {query && (
                <>
                    <TrackCollection header={{ title: 'Tracks' }} tracks={results?.tracks} />

                    <ArtistCollection header={{ title: 'Artists' }} artists={results?.artists} />

                    <AlbumCollection header={{ title: 'Albums' }} albums={results?.albums} />

                    <PlaylistCollection
                        header={{ title: 'Playlists' }}
                        playlists={results?.playlists}
                    />

                    <PodcastCollection header={{ title: 'Podcasts' }} shows={results?.shows} />

                    <EpisodeCollection
                        header={{ title: 'Episodes' }}
                        episodes={results?.episodes}
                    />

                    {!results?.tracks?.length &&
                        !results?.artists?.length &&
                        !results?.albums?.length &&
                        !results?.playlists?.length &&
                        !results?.shows?.length &&
                        !results?.episodes?.length && (
                            <p
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                No matches found
                            </p>
                        )}
                </>
            )}
        </SearchPage>
    );
};
