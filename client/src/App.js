import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyles from './styledcomponents/GlobalStyles';
import { lightTheme, darkTheme } from './styledcomponents/Themes';
import { ThemeProvider } from 'styled-components';
import { useDataLayerValue } from './DataLayer';
import { getTokenFromResponse, spotifyInstance } from './config/spotify';
import { Login } from './components';
import MainApp from './components/MainApp/MainApp';
import { useSpotifyApi } from './hooks';

const App = () => {
    const [themeState, setThemeState] = useState('dark');
    const { getMe, getUserPlaylists } = useSpotifyApi();
    const [{ token, playlistId }, dispatch] = useDataLayerValue();

    const theme = {
        ...(themeState === 'light' ? lightTheme : darkTheme),
        colors: {
            background: {
                primary: '#000',
                secondary: '#0d0d0d',
                ternary: '#1f1f1f',
            },
            text: {
                primary: '#d8d8df',
                secondary: '#5c5c70',
            },
            constants: {
                text: {
                    light: '#F4F4F6',
                    dark: '#151419',
                },
                green: {
                    default: '#1db954',
                },
            },
        },
        breakpoints: {
            lg_tablet: '(min-width: 1024px)',
            tablet: '(max-width: 770px)',
            mobile: '(max-width: 510px)',
            sm_mobile: '(max-width: 350px)',
        },
    };

    useEffect(() => {
        // Set token
        const hash = getTokenFromResponse();
        window.location.hash = '';
        let _token = token ? token : hash.access_token;

        if (_token) {
            dispatch({ type: 'SET_TOKEN', token: _token });

            spotifyInstance.setAccessToken(_token);

            getMe();
            getUserPlaylists();
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path='/' render={() => (token ? <MainApp /> : <Login />)} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
