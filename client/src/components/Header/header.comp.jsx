import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer';
import { useWindowResize } from '../../utils';

// Styled components
import StyledHeader from './header.styles';

// Material icons
import { Avatar } from '..';

// React icons
import SearchIcon from '@material-ui/icons/Search';
import { Left, Right } from '../../react_icons';

export const Header = ({ add_on }) => {
    const [
        {
            user,
            search: { query },
        },
        dispatch,
    ] = useDataLayerValue();
    const history = useHistory();
    const windowSize = useWindowResize();

    const dispatchLibraryState = (state) => {
        dispatch({ type: 'SET_LIBRARYSTATE', state: state });
    };

    return (
        <StyledHeader>
            <div className='header__left'>
                {windowSize?.width >= 1024 && (
                    <p className='header__left__historyBtns'>
                        <Left
                            onClick={() => history.goBack()}
                            fill='white'
                            width='40px'
                            height='40px'
                        />
                        <Right
                            onClick={() => history.goForward()}
                            fill='white'
                            width='40px'
                            height='40px'
                        />
                    </p>
                )}
                {add_on === 'search' && (
                    <div className='header__left__searchbar'>
                        <SearchIcon />
                        <input
                            onChange={(e) => {
                                let query = e?.target?.value;
                                dispatch({ type: 'SET_SEARCH_QUERY', query });
                            }}
                            value={query}
                            type='text'
                            name=''
                            id=''
                            placeholder='Search for artist, songs, etc'
                        />
                    </div>
                )}
                {add_on === 'library' && (
                    <div className='header__left__librarybar'>
                        <NavLink to='playlists' onClick={() => dispatchLibraryState('playlists')}>
                            playlists
                        </NavLink>
                        <NavLink to='podcasts' onClick={() => dispatchLibraryState('podcasts')}>
                            podcasts
                        </NavLink>
                        <NavLink to='artists' onClick={() => dispatchLibraryState('artists')}>
                            artists
                        </NavLink>
                        <NavLink to='albums' onClick={() => dispatchLibraryState('albums')}>
                            albums
                        </NavLink>
                    </div>
                )}
            </div>
            <div className='header__right'>
                <Avatar
                    username={user?.display_name}
                    imgUrl={user?.avatar_url}
                    displayUsername={windowSize?.width <= 1024 ? false : true}
                />
            </div>
        </StyledHeader>
    );
};
