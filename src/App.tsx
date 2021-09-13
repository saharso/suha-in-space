import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './models/enum.constants';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';
import PoopyShmoopy from './components/enemies/PoopyShmoopy/PoopyShmoopy';

function App() {
    
    const sis = useRef(null);
    const [arena, setArena] = useState(null);
    const [protagonistEl, setProtagonistEl] = useState(null);
    
    useEffect(()=>{
        setArena(sis.current);
    }, []);

    return (
        <AppContext.Provider value={null}>

            <div ref={sis} id={ConstantsEnum.ARENA_ID} className="sis">
                
                <Background/>

                <PoopyShmoopy 
                    protagonistEl={protagonistEl}
                />

                <Protagonist 
                    onProtagonistLoad={protagonistEl => setProtagonistEl(protagonistEl)}    
                    arena={arena}
                />

            </div>

        </AppContext.Provider>
    );
}

export default App;
