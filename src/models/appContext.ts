import React from 'react';
import store from './store';

export const initialState = store;
export const AppContext = React.createContext<any>({state: initialState, dispatch: undefined});