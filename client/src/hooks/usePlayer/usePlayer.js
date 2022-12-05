import { useEffect, useRef } from 'react';
import { useSpotifyApi } from '..';
import { usePlayerContext } from '../../contexts';
import { modifyTracks } from '../../utils';
// import { getRandomInt } from '../../utils';
import { findTrackIndex, getRandomInt } from './usePlayer.utils';

export const usePlayer = (audioRef) => {
    const renderCount = useRef(1);
    const {
        getTrack,
        getEpisode,
        getAlbumTracks,
        getShowEpisodes,
        getArtistTracks,
        getPlaylistTracks,
    } = useSpotifyApi();
    const [{ controls, queue, query, current_track }, playerDispatch] = usePlayerContext();
    const [currentPlayerTrack, setCurrentPlayerTrack] = [];

    const updatePlayerQueue = async () => {
        const updatePlayer = (media_tracks = []) => {
            playerDispatch({
                type: 'UPDATE_CURRENT_TRACK',
                payload: media_tracks?.[0],
            });
            playerDispatch({
                type: 'UPDATE_CONTROLS',
                payload: { is_playing: true },
            });
            playerDispatch({
                type: 'UPDATE_QUEUE',
                payload: media_tracks,
            });
        };
        console.log('action type => ', query?.type);
        try {
            switch (query?.type) {
                case 'playlist:track': {
                    console.log({
                        track: query.payload.track,
                        queue: query.payload.queue,
                    });
                    setCurrentPlayerTrack((prevState) => ({
                        ...query.payload.track,
                        id: query?.payload?.track?.id,
                        preview_url: query?.payload?.track?.preview_url,
                        images: query?.payload?.track?.album?.images,
                    }));
                    return playerDispatch({
                        type: 'UPDATE_QUEUE',
                        payload: query?.payload?.queue.map(({ track }) => ({
                            ...track,
                            images: track?.album?.images,
                        })),
                    });
                }

                case 'playlist': {
                    return getPlaylistTracks(query?.id).then((playlist_tracks) =>
                        updatePlayer(playlist_tracks)
                    );
                }

                case 'album': {
                    return getAlbumTracks(query?.id, query?.variables).then((album_tracks) =>
                        updatePlayer(album_tracks)
                    );
                }

                case 'track': {
                    return getTrack(query?.id).then((track) => updatePlayer(modifyTracks([track])));
                }

                case 'show': {
                    return getShowEpisodes(query?.id).then((show_episodes) => {
                        updatePlayer(show_episodes);
                    });
                }

                case 'episode': {
                    return getEpisode(query?.id).then((episode) => {
                        console.log('fetched Episode => ', episode);
                        updatePlayer(episode);
                    });
                }

                default: {
                    return queue;
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            playerDispatch({
                type: 'UPDATE_CONTROLS',
                payload: {
                    is_playing: true,
                },
            });
        }
    };

    const toggleAudioPlayPause = () => {
        console.log('audioref => ', audioRef);
        if (!audioRef.current) return;
        if (controls?.is_playing && current_track?.preview_url) {
            console.log('Toggled play state');
            audioRef.current.play();
        } else audioRef.current.pause();
    };

    const adjustVolume = () => {
        if (!audioRef.current) return;
        if (controls?.volume > 0 && controls?.volume < 100) {
            audioRef.current.volume = controls?.volume / 100;
            console.log('Volume value => ', audioRef.current.volume);
        }
    };

    const skipToNext = () => {
        let curTrackIndex = queue.findIndex((track) => track?.id === current_track?.id);

        if (!queue[curTrackIndex + 1]?.preview_url) curTrackIndex++;

        if (controls.shuffle) return shufflePlayerQueue();
        if (controls.repeat_mode === 'no_repeat') {
            if (curTrackIndex >= queue.length - 1 || queue.length === 1) {
                playerDispatch({ type: 'UPDATE_CURRENT_TRACK', payload: queue?.[0] });
                return playerDispatch({
                    type: 'UPDATE_CONTROLS',
                    payload: {
                        is_playing: false,
                    },
                });
            } else
                return playerDispatch({
                    type: 'UPDATE_CURRENT_TRACK',
                    payload: queue[curTrackIndex + 1],
                });
        } else if (controls.repeat_mode === 'repeat') {
            if (queue.length === 1) return audioRef.current.play();
            if (curTrackIndex === queue.length - 1)
                return playerDispatch({ type: 'UPDATE_CURRENT_TRACK', payload: queue[0] });
            else
                return playerDispatch({
                    type: 'UPDATE_CURRENT_TRACK',
                    payload: queue[curTrackIndex + 1],
                });
        } else if (controls.repeat_mode === 'repeat_one') {
            return audioRef.current.play();
        }
    };

    const skipToPrevious = () => {
        const curTrackIndex = queue?.findIndex((track) => track?.id === current_track?.id);

        if (queue.length <= 1) return;
        if (curTrackIndex === 0)
            return playerDispatch({
                type: 'UPDATE_CURRENT_TRACK',
                payload: queue[queue?.length - 1],
            });

        return playerDispatch({
            type: 'UPDATE_CURRENT_TRACK',
            payload: queue[curTrackIndex - 1],
        });
    };

    const shufflePlayerQueue = () => {
        const [curTrackIndex, shuffledTrackIndex] = [
            queue?.findIndex((track) => track?.id === current_track?.id),
            getRandomInt(queue?.length),
        ];

        if (curTrackIndex === shuffledTrackIndex || !queue[curTrackIndex]?.preview_url)
            return shufflePlayerQueue();
        else playerDispatch({ type: 'UPDATE_CURRENT_TRACK', payload: queue[shuffledTrackIndex] });
    };

    const changeRepeatMode = () => {
        const updateRepeatMode = (mode) => ({
            type: 'UPDATE_CONTROLS',
            payload: { repeat_mode: mode },
        });

        if (controls?.repeat_mode === 'no_repeat') playerDispatch(updateRepeatMode('repeat'));
        else if (controls?.repeat_mode === 'repeat') playerDispatch(updateRepeatMode('repeat_one'));
        if (controls?.repeat_mode === 'repeat_one') playerDispatch(updateRepeatMode('no_repeat'));
    };

    useEffect(() => {
        console.log('Render Count => ', renderCount.current);
        toggleAudioPlayPause();
        renderCount.current++;
        console.log('cur track in hook => ', current_track);
        console.log('Render Count => ', renderCount.current);
    }, [controls?.is_playing, current_track?.id]);

    useEffect(() => {
        adjustVolume();
    }, [controls?.volume, current_track?.id]);

    useEffect(() => {
        console.log('Recognised query trigger');
        (async () => await updatePlayerQueue())();
    }, [query?.id]);

    return {
        controls: {
            ...controls,
        },
        skipToNext,
        skipToPrevious,
        changeRepeatMode,
        current_track /*queue[findTrackIndex(queue, current_track)]*/,
        queue,
    };
};
