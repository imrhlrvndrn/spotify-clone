import React from 'react';
import { accessUrl } from '../../config/spotify';

// Styled components
import { LoginSection } from './login.styles';

// Images
import spotifyLogo from '../../react_icons/Spotifylogo.png';
import { useEffect } from 'react';

export const Login = () => {
    // useEffect(() => {
    //     window.location = accessUrl;
    // }, []);

    return (
        <LoginSection>
            <img src={spotifyLogo} alt='' />
            <a href={accessUrl}>Login to Spotify</a>
        </LoginSection>
    );
};
