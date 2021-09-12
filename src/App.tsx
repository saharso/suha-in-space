import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './models/enum.constants';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';

function App() {
    
    const sis = useRef(null);
    const [arena, setArena] = useState(null);
    
    useEffect(()=>{
        setArena(sis.current);
    }, []);

    return (
        <AppContext.Provider value={null}>

            <div ref={sis} id={ConstantsEnum.ARENA_ID} className="sis">
                <Background/>

                <Protagonist arena={arena}/>

            </div>

        </AppContext.Provider>
    );
}

export default App;
