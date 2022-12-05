import React from 'react';

export const PlayIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 24 24' aria-hidden='true'>
            <polygon points='21.57 12 5.98 3 5.98 21 21.57 12' fill={color}></polygon>
        </svg>
    );
};

export const PauseIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <>
            <svg fill={color} height={size} width={size} viewBox='0 0 16 16' aria-hidden='true'>
                <path fill='none' d='M0 0h16v16H0z'></path>
                <path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
            </svg>
        </>
    );
};

export const ShuffleIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path d='M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z'></path>
        </svg>
    );
};

export const PreviousIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path d='M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z'></path>
        </svg>
    );
};

export const NextIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
        </svg>
    );
};

export const RepeatDisabledIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path d='M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z'></path>
        </svg>
    );
};

export const RepeatIcon = ({ color = '#1DB954', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path d='M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z'></path>
        </svg>
    );
};

export const RepeatOneIcon = ({ color = '#1DB954', size = 26 }) => {
    return (
        <svg fill={color} height={size} width={size} viewBox='0 0 16 16'>
            <path fill='none' d='M0 0h16v16H0z'></path>
            <path d='M5 5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zm5.5 7H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zm1-12C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z'></path>
        </svg>
    );
};

export const VolumeIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg
            fill={color}
            height={size}
            width={size}
            aria-label='Volume control'
            viewBox='0 0 16 16'
        >
            <path d='M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z'></path>
        </svg>
    );
};

export const PlayerQueueIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth='0'
            viewBox='0 0 24 24'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z'></path>
        </svg>
    );
};
