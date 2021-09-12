import React from 'react';
import './App.scss';
import Background from './components/backgroujnd/Background';
import EnumConstants from './models/constants';
import AppContext from './models/context';

function App() {
  
    return (
        <AppContext.Provider value={null}>

            <div id={EnumConstants.ARENA_ID} className="sis">
                <Background/>

            </div>
            
        </AppContext.Provider>
    );
}

export default App;
