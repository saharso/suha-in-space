import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './models/enum.constants';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';
import PoopyShmoopy from './components/enemies/PoopyShmoopy/PoopyShmoopy';
import Config from './models/config';

const config = new Config();

function App() {
    
    const [protagonistEl, setProtagonistEl] = useState(null);
    
    return (
        <AppContext.Provider value={{protagonistEl}}>

            <div id={ConstantsEnum.ARENA_ID} className="sis">
                
                <Background/>

                <PoopyShmoopy 
                    protagonistEl={protagonistEl}
                />

                <Protagonist 
                    onProtagonistLoad={protagonistEl => setProtagonistEl(protagonistEl)}    
                    config={config.protagonist}
                />

            </div>

        </AppContext.Provider>
    );
}

export default App;
