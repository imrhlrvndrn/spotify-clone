import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer';
import { useWindowResize } from '../../hooks';
import { char_limit } from '../../utils';

//styles
import { Tile, TileContainer } from './playlist.styles';

export const PlaylistTile = () => {
    const history = useHistory();
    const _window = useWindowResize();
    const [{ playlists }] = useDataLayerValue();

    return (
        <TileContainer>
            {playlists?.slice(0, _window?.width < 1200 ? 3 : 6)?.map((playlist) => (
                <Tile key={playlist?.id} onClick={() => history.push(`/playlist/${playlist?.id}`)}>
                    <img
                        src={
                            playlist?.images?.[0]?.url ||
                            'https://i.scdn.co/image/ab67616d0000b273cdf7d1d8ff13c3360a8c033d'
                        }
                        alt={playlist?.name}
                    />
                    <div className='info'>
                        <h1 title={playlist?.name}>{char_limit(playlist?.name, 40)}</h1>
                    </div>
                </Tile>
            ))}
        </TileContainer>
    );
};
