import React from 'react';
import './App.scss';
import Background from './components/treeDisplay/components/backgroujnd/Background';
import AppContext from './models/context';

function App() {
  
    return (
        <AppContext.Provider value={null}>

            <div className="sis">
                <Background/>

            </div>
        </AppContext.Provider>
    );
}

export default App;
