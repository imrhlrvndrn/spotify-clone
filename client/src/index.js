import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './contexts/reducer';
import { PlayerProvider } from './contexts';

ReactDOM.render(
    <React.StrictMode>
        <DataLayer initialState={initialState} reducer={reducer}>
            <PlayerProvider>
                <App />
            </PlayerProvider>
        </DataLayer>
    </React.StrictMode>,
    document.getElementById('root')
);
