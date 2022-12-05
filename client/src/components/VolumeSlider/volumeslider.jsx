import React from 'react';

// styles
import { RangeInput } from './volumeslider';

export const VolumeSlider = ({ type = 'range', min = 0, max = 100, value = 50, ...props }) => {
    return <RangeInput {...props} type={type} min={min} max={max} value={value} />;
};
