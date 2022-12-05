import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePlayerContext } from '../../contexts';
import { useDataLayerValue } from '../../DataLayer';
import { useSpotifyApi } from '../../hooks/useSpotifyApi';
import { PlayIcon } from '../../react_icons';
import { char_limit, modifyPlaylists, modifyTracks } from '../../utils';

//styles
import { IconImage } from '../Avatar/avatar.styles';
import { Tile, TileContainer } from './playlist.styles';

export const PlaylistTile = () => {
    const history = useHistory();
    const [{ playlists }] = useDataLayerValue();
    const { getPlaylistTracks } = useSpotifyApi();
    const [_, playerDispatch] = usePlayerContext();

    return (
        <TileContainer>
            {playlists?.slice(0, 6)?.map((playlist) => (
                <Tile onClick={() => history.push(`/playlist/${playlist?.id}`)}>
                    <img
                        src={
                            playlist?.images?.[0]?.url ||
                            'https://i.scdn.co/image/ab67616d0000b273cdf7d1d8ff13c3360a8c033d'
                        }
                        alt={playlist?.name}
                    />
                    <div className='info'>
                        <h1 title={playlist?.name}>{char_limit(playlist?.name, 40)}</h1>
                        <IconImage
                            padding='1rem'
                            background='#1db954'
                            onClick={async (event) => {
                                event.stopPropagation();
                                let playlist_tracks = await getPlaylistTracks(playlist?.id);
                                // playlist_tracks = playlist_tracks?.reduce(
                                //     (acc, cur) => [
                                //         ...acc,
                                //         { ...cur, album: { images: cur?.images } },
                                //     ],
                                //     []
                                // );

                                playerDispatch({
                                    type: 'UPDATE_CURRENT_TRACK',
                                    payload: playlist_tracks?.[0],
                                });
                                playerDispatch({
                                    type: 'UPDATE_CONTROLS',
                                    payload: { is_playing: true },
                                });
                                playerDispatch({
                                    type: 'UPDATE_QUEUE',
                                    payload: playlist_tracks,
                                });
                            }}
                        >
                            <PlayIcon color='black' />
                        </IconImage>
                    </div>
                </Tile>
            ))}
        </TileContainer>
    );
};
