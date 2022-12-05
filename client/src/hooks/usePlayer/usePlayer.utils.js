export const findTrackIndex = (trackList = [], track) =>
    trackList?.findIndex((trackItem) => trackItem?.id === track?.id);

export const getRandomInt = (limit) => Math.floor(Math.random() * limit);
