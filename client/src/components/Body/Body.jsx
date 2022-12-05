import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

// Styled components
import StyledBody from './StyledBody';

// React components
import { Header } from '../';
import { Library, Search, Home, Media } from '../../pages';

const Body = ({ match }) => {
    let mainAppState = match?.params?.appState;
    const header_add_on = ['search', 'library'];
    const media_types = ['playlist', 'track', 'artist', 'album', 'show', 'episode'];

    return (
        <StyledBody state={mainAppState} media_types={media_types}>
            {header_add_on.includes(mainAppState) ? <Header add_on={mainAppState} /> : <Header />}

            {mainAppState === undefined ? (
                <Home />
            ) : media_types.includes(mainAppState) ? (
                <Route
                    exact
                    path={`/${mainAppState}/:id`}
                    render={(props) => <Media {...props} media_type={mainAppState} />}
                />
            ) : mainAppState === 'search' ? (
                <Search />
            ) : mainAppState === 'library' ? (
                <Route exact path='/library/:libraryState' component={Library} />
            ) : null}
        </StyledBody>
    );
};

export default Body;
