import React, { useEffect, useState } from 'react';
import { spotifyInstance } from '../../config/spotify';
import { useDataLayerValue } from '../../DataLayer';
import { useSpotifyApi } from '../../hooks';

// Styled-components
import { HomePage } from './home.styles';

// React components
import { MediaCollection, MediaCollectionCard } from '../../components';
import { PlaylistTile } from '../../components/Playlist/playlist.comp';

export const Home = () => {
    // ! Do not touch the logic of this component
    const [
        {
            token,
            newReleases,
            user_media: { recentlyPlayedTracks, savedShows },
        },
        dispatch,
    ] = useDataLayerValue();
    const { getNewReleases, getMyRecentlyPlayedTracks, getMySavedShows } = useSpotifyApi();

    useEffect(() => {
        getNewReleases({ limit: 6 });
        getMySavedShows({ limit: 6 });
        getMyRecentlyPlayedTracks({ limit: 6 });

        // ! This dependency is required to be like this
    }, [newReleases?.albums]);

    return (
        <HomePage>
            <h1 style={{ fontSize: '1.5rem', margin: '1rem 0 2rem 0' }}>Good Night, Rahul</h1>
            <PlaylistTile />
            {/* Recently played */}
            {recentlyPlayedTracks.length > 0 && (
                <MediaCollection title='Your recently played'>
                    {recentlyPlayedTracks?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            ß
                            link={`/track/${item?.id}`}
                            name={
                                item?.name?.length >= 20
                                    ? `${
                                          item?.name?.substring(0, 20) ||
                                          item?.album?.name?.substring(0, 20)
                                      } ....`
                                    : `${item?.name || item?.album?.name}`
                            }
                            image={item?.album?.images[0]?.url}
                            artist={item?.artists.map((artist) => artist?.name).join(', ')}
                        />
                    ))}
                </MediaCollection>
            )}

            {/* New Releases */}
            {newReleases?.length > 0 && (
                <MediaCollection title='New releases'>
                    {newReleases?.map((item) => {
                        return (
                            <MediaCollectionCard
                                key={item?.id}
                                id={item?.id}
                                type={item?.type}
                                link={`/album/${item?.id}`}
                                name={
                                    item?.name?.length >= 20
                                        ? `${item?.name?.substring(0, 20)} ....`
                                        : `${item?.name}`
                                }
                                image={item?.images[0]?.url}
                                artist={item?.artists.map((artist) => artist?.name).join(', ')}
                            />
                        );
                    })}
                </MediaCollection>
            )}

            {/* Saved shows/podcasts */}
            {savedShows?.length > 0 && (
                <MediaCollection title='Your top shows'>
                    {savedShows?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            link={`/show/${item?.id}`}
                            name={
                                item?.name?.length >= 20
                                    ? `${item?.name?.substring(0, 20)} ....`
                                    : `${item?.name}`
                            }
                            image={item?.images[0]?.url}
                            artist={item?.artists?.map((artist) => artist?.name).join(', ')}
                        />
                    ))}
                </MediaCollection>
            )}
        </HomePage>
    );
};
