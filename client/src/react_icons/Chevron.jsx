import React from 'react';

export const Down = ({ size = 26, fill = 'currentColor', className, onClick }) => {
    return (
        <svg
            stroke={fill}
            fill={fill}
            strokeWidth='0'
            viewBox='0 0 512 512'
            height={size}
            width={size}
            className={className && className}
            onClick={onClick}
        >
            <path d='M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z'></path>
        </svg>
    );
};

export const Left = ({ width, height, className, fill, onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height={height ? height : '24'}
            viewBox='0 0 24 24'
            width={width ? width : '24'}
            className={className && className}
            fill={fill ? fill : 'black'}
            onClick={onClick}
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
        </svg>
    );
};

export const Right = ({ width, height, className, fill, onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height={height ? height : '24'}
            viewBox='0 0 24 24'
            width={width ? width : '24'}
            className={className && className}
            fill={fill ? fill : 'black'}
            onClick={onClick}
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
        </svg>
    );
};
