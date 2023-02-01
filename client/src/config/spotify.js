import SpotifyWebApi from 'spotify-web-api-js';

export const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-library-read',
    'user-top-read',
    'user-follow-read',
    'user-modify-playback-state',
];

export const spotifyInstance = new SpotifyWebApi();

export const getTokenFromResponse = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
    '%20'
)}&response_type=token`;
