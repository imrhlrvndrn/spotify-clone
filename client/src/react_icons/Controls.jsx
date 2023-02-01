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
            stroke={color}
            fill={color}
            strokeWidth='0'
            viewBox='0 0 16 16'
            height={size}
            width={size}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.5 4.83h2.79L8.15 1l.85.35v13l-.85.33-3.86-3.85H1.5l-.5-.5v-5l.5-.5zM4.85 10L8 13.14V2.56L4.85 5.68l-.35.15H2v4h2.5l.35.17zM15 7.83a6.97 6.97 0 0 1-1.578 4.428l-.712-.71A5.975 5.975 0 0 0 14 7.83c0-1.4-.48-2.689-1.284-3.71l.712-.71A6.971 6.971 0 0 1 15 7.83zm-2 0a4.978 4.978 0 0 1-1.002 3.004l-.716-.716A3.982 3.982 0 0 0 12 7.83a3.98 3.98 0 0 0-.713-2.28l.716-.716c.626.835.997 1.872.997 2.996zm-2 0c0 .574-.16 1.11-.44 1.566l-.739-.738a1.993 1.993 0 0 0 .005-1.647l.739-.739c.276.454.435.988.435 1.558z'
            ></path>
        </svg>
    );
};

export const VolumeMuteIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth='0'
            viewBox='0 0 16 16'
            height={size}
            width={size}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.5 5h2.79l3.86-3.83.85.35v13l-.85.33L4.29 11H1.5l-.5-.5v-5l.5-.5zm3.35 5.17L8 13.31V2.73L4.85 5.85 4.5 6H2v4h2.5l.35.17zm9.381-4.108l.707.707L13.207 8.5l1.731 1.732-.707.707L12.5 9.207l-1.732 1.732-.707-.707L11.793 8.5 10.06 6.77l.707-.707 1.733 1.73 1.731-1.731z'
            ></path>
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
