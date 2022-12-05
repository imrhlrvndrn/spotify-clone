import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlayIcon } from '../../react_icons';
import { IconImage } from '../Avatar/avatar.styles';
import PlayButton from '../PlayButton/playbutton.comp';

// Styled components
import { MediaCard, MediaCardInfo, MediaCollectionContainer } from './mediacollection.styles';

export const MediaCollection = ({ title, flexwrap, mutable, children }) => {
    return (
        <MediaCollectionContainer
            mutable={mutable ? true : false}
            flexwrap={flexwrap ? true : false}
        >
            <h1 className='title'>{title}</h1>
            <div className='wrapper'>{children}</div>
        </MediaCollectionContainer>
    );
};

export const MediaCollectionCard = ({
    id,
    name,
    image,
    artist,
    type,
    link,
    onClick,
    enableType,
    mutable,
}) => {
    const history = useHistory();

    return (
        <MediaCard mutable={mutable ? true : false} onClick={() => history.push(link)}>
            {/* <Link to={link}> */}
            <div className='image_wrapper'>
                <img
                    className={image ? '' : 'dummy-image'}
                    style={{
                        borderRadius: `${type === 'artist' || type === 'user' ? '50%' : '5px'}`,
                    }}
                    src={image ? image : '/assets/dummy-image.png'}
                    alt={name}
                />
                {type !== 'artist' && (
                    <PlayButton
                        variant='card'
                        media={{ id, type, variables: { images: [{ url: image }] } }}
                    />
                )}
            </div>
            <MediaCardInfo>
                <h2 title={name}>
                    {name?.length >= 25 && !mutable ? `${name?.substring(0, 15)} ....` : `${name}`}
                </h2>
                {artist && (
                    <p title={artist}>
                        {type === 'playlist' && 'By '}
                        {artist?.length >= 25 && !mutable
                            ? `${artist?.substring(0, 15)} ....`
                            : `${artist}`}
                    </p>
                )}
                {enableType && <p>{type}</p>}
            </MediaCardInfo>
            {/* </Link> */}
        </MediaCard>
    );
};

export const TrackCollection = ({
    header: { title = 'Tracks', sub_title = '', see_all_url = '' },
    tracks = [],
}) => {
    return (
        <Fragment>
            {tracks?.length > 0 && (
                <MediaCollection title={title}>
                    {tracks?.map((track) => (
                        <MediaCollectionCard
                            key={track?.id}
                            id={track?.id}
                            name={track?.name}
                            type={track?.type}
                            link={`/track/${track?.id}`}
                            image={track?.album?.images[0]?.url}
                            artist={track?.artists?.map((artist) => artist?.name)?.join(', ')}
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};

export const ArtistCollection = ({
    header: { title = 'Artists', sub_title = '', see_all_url = '' },
    artists = [],
}) => {
    return (
        <Fragment>
            {artists?.length > 0 && (
                <MediaCollection title={title}>
                    {artists?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            name={item?.name}
                            link={`/artist/${item?.id}`}
                            image={item?.images[0]?.url}
                            type={item?.type}
                            enableType
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};

export const AlbumCollection = ({
    header: { title = 'Albums', sub_title = '', see_all_url = '' },
    albums = [],
}) => {
    return (
        <Fragment>
            {albums?.length > 0 && (
                <MediaCollection title={title}>
                    {albums?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            name={item?.name}
                            link={`/album/${item?.id}`}
                            image={item?.images[0]?.url}
                            artist={item?.artists?.map((artist) => artist?.name)?.join(', ')}
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};

export const PlaylistCollection = ({
    header: { title = 'Playlists', sub_title = '', see_all_url = '' },
    playlists = [],
}) => {
    return (
        <Fragment>
            {playlists?.length > 0 && (
                <MediaCollection title={title}>
                    {playlists?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            name={item?.name}
                            link={`/playlist/${item?.id}`}
                            image={item?.images[0]?.url}
                            artist={item?.artists?.map((artist) => artist?.name)?.join(', ')}
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};

export const PodcastCollection = ({
    header: { title = 'Podcasts', sub_title = '', see_all_url = '' },
    shows = [],
}) => {
    return (
        <Fragment>
            {shows?.length > 0 && (
                <MediaCollection title={title}>
                    {shows?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            link={`/show/${item?.id}`}
                            name={item?.name}
                            image={item?.images[0]?.url}
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};

export const EpisodeCollection = ({
    header: { title = 'Episodes', sub_title = '', see_all_url = '' },
    episodes = [],
}) => {
    return (
        <Fragment>
            {episodes?.length > 0 && (
                <MediaCollection title={title}>
                    {episodes?.map((item) => (
                        <MediaCollectionCard
                            key={item?.id}
                            id={item?.id}
                            type={item?.type}
                            link={`/episode/${item?.id}`}
                            name={item?.name}
                            image={item?.album?.images[0]?.url}
                        />
                    ))}
                </MediaCollection>
            )}
        </Fragment>
    );
};
