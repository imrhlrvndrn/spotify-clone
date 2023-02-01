import React, { useEffect, useState, useRef } from 'react';
import { getDominantColor } from '@rtcoder/dominant-color';
import { useWindowResize } from '../../hooks';

// styles
import { HeroSection, HeroSectionWrapper, MediaHeroContent } from './media.styles';
import { MediaTrack } from '..';
import { Episode } from '../Episode/episode.comp';
import { char_limit } from '../../utils';

export const MediaHero = ({ cover_image, name, type, owner, total_tracks }) => {
    const windowSize = useWindowResize();
    const windowSizeCalc = windowSize.width >= 1024;
    const windowSizeCalcLt = windowSize.width <= 1024;
    const [dominantColor, setDominantColor] = useState('');
    let media_image_ref = useRef(null);

    // ! Could use the useCallback/useMemo hooks here
    useEffect(() => {
        getDominantColor(media_image_ref?.current, {
            colorFormat: 'rgb',
            skipPixels: 10,
            colorsPaletteLength: 1,
            callback: (data) => {
                setDominantColor(() => data);
            },
        });

        return () => (media_image_ref = { current: null });
    });

    return (
        <HeroSection
            style={{
                background: `linear-gradient(360deg, rgb(0,0,0) 6%, ${dominantColor} 100%)`,
            }}
        >
            <HeroSectionWrapper>
                <img
                    ref={media_image_ref}
                    src={
                        cover_image ||
                        'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'
                    }
                    alt={name}
                />
                <MediaHeroContent>
                    {windowSizeCalc && <strong>{type}</strong>}
                    <h4 title={name}>{char_limit(name, 20)}</h4>
                    {windowSizeCalc && (
                        <p>
                            {total_tracks} {total_tracks === 1 ? 'song' : 'songs'}
                        </p>
                    )}
                    {windowSizeCalcLt && (
                        <p
                            style={{
                                textTransform: 'uppercase',
                                fontSize: '.8rem',
                                fontWeight: '600',
                                marginTop: '.5rem',
                            }}
                        >
                            By {owner?.display_name}
                        </p>
                    )}
                </MediaHeroContent>
            </HeroSectionWrapper>
        </HeroSection>
    );
};

export const MediaTracksContainer = ({ tracks = [], episodes = [], addMediaTracksToQueue }) => {
    return (
        <div className='detailed__songs'>
            {/* <div className='detailed__songs__icons'>
                <a target='_blank' href={discover_weekly?.external_urls?.spotify}>
                    <PlayCircleFilledIcon className='detailed__shuffle' />
                </a>
                <FavoriteIcon fontSize='large' />
                <MoreHorizIcon />
            </div> */}
            {tracks?.length > 0 &&
                tracks?.map((item, index) => {
                    return (
                        <MediaTrack
                            order={index + 1}
                            track={item}
                            addMediaTracksToQueue={addMediaTracksToQueue}
                        />
                    );
                })}
            {episodes?.length > 0 &&
                episodes?.map((episode) => {
                    return (
                        <Episode
                            key={episode?.id}
                            episode={episode}
                            addMediaTracksToQueue={addMediaTracksToQueue}
                        />
                    );
                })}
        </div>
    );
};
