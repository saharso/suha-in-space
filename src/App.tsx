import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './global/consts/constants.enum';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';
import Config from './models/config';
import EnemiesIndex from './components/enemies/EnemiesIndex';
import ScoreBoard from './components/scoreBoard/ScoreBoard';

const config = new Config();

function App() {
    
    const [protagonistEl, setProtagonistEl] = useState(null);

    const [scoreUpdate, setScoreUpdate] = useState<number>(0);

    return (
        <AppContext.Provider value={{protagonistEl}}>

            <div id={ConstantsEnum.ARENA_ID} className="sis">
                
                <Background/>

                <ScoreBoard
                    scoreIncrement={scoreUpdate}
                />

                <EnemiesIndex
                    config={config}
                    score={config.scoreBoard.score}
                    onEnemyHit={(data)=>{
                        setScoreUpdate(0);
                        setScoreUpdate(data.value);
                    }}
                    onProtagonistHit={()=>{
                        console.log('hit');
                    }}
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
