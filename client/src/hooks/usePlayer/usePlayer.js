import { useEffect, useRef } from 'react';
import { useSpotifyApi } from '..';
import { usePlayerContext } from '../../contexts';
import { modifyTracks } from '../../utils';
// import { getRandomInt } from '../../utils';
import { findTrackIndex, getRandomInt } from './usePlayer.utils';

export const usePlayer = (audioRef) => {
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
        try {
            switch (query?.type) {
                case 'playlist:track': {
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
        if (!audioRef.current) return;
        if (controls?.is_playing && current_track?.preview_url) {
            audioRef.current.play();
        } else audioRef.current.pause();
    };

    const adjustVolume = () => {
        if (!audioRef.current) return;
        if (controls?.volume >= 0 && controls?.volume <= 100) {
            audioRef.current.volume = controls?.volume / 100;
        }
    };

    const playAudio = () =>
        playerDispatch({
            type: 'UPDATE_CONTROLS',
            payload: { ...controls, is_playing: true },
        });

    const pauseAudio = () =>
        playerDispatch({
            type: 'UPDATE_CONTROLS',
            payload: { ...controls, is_playing: false },
        });

    const triggerRepeatModeActions = (current_track_index) => {
        if (controls.repeat_mode === 'no_repeat') {
            if (current_track_index > queue.length - 1 || queue.length === 1) {
                playerDispatch({ type: 'UPDATE_CURRENT_TRACK', payload: queue?.[0] });
            } else
                playerDispatch({
                    type: 'UPDATE_CURRENT_TRACK',
                    payload: queue[current_track_index],
                });
            return pauseAudio();
        } else if (controls.repeat_mode === 'repeat') {
            if (queue.length === 1) return playAudio();
            if (current_track_index > queue.length - 1)
                playerDispatch({ type: 'UPDATE_CURRENT_TRACK', payload: queue[0] });
            else
                playerDispatch({
                    type: 'UPDATE_CURRENT_TRACK',
                    payload: queue[current_track_index],
                });

            return playAudio();
        } else if (controls.repeat_mode === 'repeat_one') {
            return playAudio();
        }
    };

    const skipToNext = () => {
        let current_track_index = findTrackIndex(queue, current_track);

        for (let i = current_track_index + 1; i < queue?.length; i++) {
            if (!queue[i]?.preview_url) continue;
            else {
                current_track_index = i;
                break;
            }
        }

        if (current_track_index === queue?.length - 1) current_track_index += 1;
        if (controls.shuffle) return shufflePlayerQueue();
        triggerRepeatModeActions(current_track_index);
    };

    const skipToPrevious = () => {
        const current_track_index = findTrackIndex(queue, current_track);

        if (queue.length <= 1) return;
        if (current_track_index === 0)
            return playerDispatch({
                type: 'UPDATE_CURRENT_TRACK',
                payload: queue[queue?.length - 1],
            });

        return playerDispatch({
            type: 'UPDATE_CURRENT_TRACK',
            payload: queue[current_track_index - 1],
        });
    };

    const shufflePlayerQueue = () => {
        const [current_track_index, shuffledTrackIndex] = [
            findTrackIndex(queue, current_track),
            getRandomInt(queue?.length),
        ];

        if (current_track_index === shuffledTrackIndex || !queue[current_track_index]?.preview_url)
            return shufflePlayerQueue();
        else triggerRepeatModeActions(shuffledTrackIndex);
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
        toggleAudioPlayPause();
    }, [controls?.is_playing, current_track?.id]);

    useEffect(() => {
        adjustVolume();
    }, [controls?.volume, current_track?.id]);

    useEffect(() => {
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
