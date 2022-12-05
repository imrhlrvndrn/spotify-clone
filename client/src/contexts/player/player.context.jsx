import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { player_reducers, player_initial_state } from './player.reducer';

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    return (
        <PlayerContext.Provider value={useReducer(player_reducers, player_initial_state)}>
            {children}
        </PlayerContext.Provider>
    );
};
