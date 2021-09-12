
import React from 'react';
import store from './store';

export const initialState = store;
const AppContext = React.createContext<any>({state: initialState, dispatch: undefined});

export default AppContext;