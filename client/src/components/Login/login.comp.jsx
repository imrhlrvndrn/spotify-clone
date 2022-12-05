import React from 'react';
import { accessUrl } from '../../config/spotify';

// Styled components
import { LoginSection } from './login.styles';

// Images
import spotifyLogo from '../../react_icons/Spotifylogo.png';

export const Login = () => {
    return (
        <LoginSection>
            <img src={spotifyLogo} alt='' />
            <a href={accessUrl}>Login to Spotify</a>
        </LoginSection>
    );
};
