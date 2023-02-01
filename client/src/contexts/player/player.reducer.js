export const player_initial_state = {
    controls: {
        is_playing: false,
        volume: 5,
        shuffle: false,
        repeat_mode: 'repeat',
        muted: false,
    },
    current_track: {},
    queue: [],
    query: {
        id: '',
        type: 'track',
        variables: {},
    },
};

export const player_reducers = (state, action) => {
    switch (action?.type) {
        case 'UPDATE_QUEUE': {
            return { ...state, queue: [...action?.payload] };
        }

        case 'UPDATE_CURRENT_TRACK': {
            return { ...state, current_track: action?.payload };
        }
        case 'UPDATE_QUERY': {
            return { ...state, query: action?.payload };
        }
        case 'UPDATE_CONTROLS': {
            return { ...state, controls: { ...state?.controls, ...action?.payload } };
        }

        default: {
            return state;
        }
    }
};
