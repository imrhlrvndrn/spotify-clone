import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// Styled components
import StyledMainApp from './StyledMainApp';

// React components
import Body from '../Body/Body';
import { Player, Sidebar } from '../';
import { ExtendedPlayer } from '../Player/player.comp';

const MainApp = () => {
    const [showExtendedPlayer, setShowExtendedPlayer] = useState(false);

    return (
        <StyledMainApp>
            <div className='mainApp__body'>
                <Sidebar />
                <>
                    <Route exact path='/' component={Body} />
                    <Route exact path='/:appState' component={Body} />
                    <Route exact path='/:appState/:id' component={Body} />
                </>
            </div>
            <Player showExtendedPlayer={setShowExtendedPlayer} />
            {showExtendedPlayer && <ExtendedPlayer showExtendedPlayer={setShowExtendedPlayer} />}
        </StyledMainApp>
    );
};

export default MainApp;
