import React, { useEffect, useRef, useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { useSpotifyApi } from '../../hooks';
import { useWindowResize } from '../../utils';
import { usePlayerContext } from '../../contexts';

// Styled components
import { MediaPage } from './media.styles';

// Material icons
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// React componets
import { MediaHero, MediaTracksContainer } from '../../components';

export const Media = ({ match, media_type }) => {
    const [{ discover_weekly, media_id, artist_top_tracks, currentPlaylist }, dispatch] =
        useDataLayerValue();
    const [{ queue }, playerDispatch] = usePlayerContext();
    const [media, setMedia] = useState({});
    const { fetchMedia } = useSpotifyApi();
    const windowSize = useWindowResize();
    const windowSizeCalc = windowSize.width >= 1024;
    const windowSizeCalcLt = windowSize.width <= 1024;

    useEffect(() => {
        dispatch({ type: 'SET_MEDIA_ID', media_id: match.params.id });

        (async () => {
            let media = await fetchMedia({ media_type, media_id: match?.params?.id });
            setMedia(() => media);
            console.log('Media tracks => ', media);
        })();

        return () => {
            dispatch({ type: 'SET_MEDIA_ID', media_id: '' });
        };
    }, [match?.params?.id, media_type]);

    const mediaToPlayerQueue = () => {
        playerDispatch({ type: 'UPDATE_QUEUE', payload: media?.tracks || media?.episodes });
    };

    console.log('The updated queue =>', queue);

    return (
        <MediaPage>
            <MediaHero
                name={media?.name}
                type={media?.type}
                owner={media?.owner}
                cover_image={media?.cover_image}
                total_tracks={media?.total_tracks}
            />

            <MediaTracksContainer
                addMediaTracksToQueue={mediaToPlayerQueue}
                tracks={media?.tracks}
                episodes={media?.episodes}
            />
        </MediaPage>
    );
};
