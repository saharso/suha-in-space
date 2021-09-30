import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './global/consts/constants.enum';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';
import Config from './models/config';
import EnemiesIndex from './components/entities/components/enemies/EnemiesIndex';
import ScoreBoard from './components/scoreBoard/ScoreBoard';
import PrizesIndex from './components/entities/components/prizes/PrizesIndex';

const config = new Config();

function App() {
    
    const [protagonistEl, setProtagonistEl] = useState(null);

    const [incrementScoreBy, setIncrementScoreBy] = useState<number>(0);

    const [score, setScore] = useState<number>(0);

    return (
        <AppContext.Provider value={{protagonistEl}}>

            <div id={ConstantsEnum.ARENA_ID} className="sis">
                
                <Background/>

                <ScoreBoard
                    scoreIncrement={incrementScoreBy}
                    onScoreBoardUpdate={(updatedScore)=>{
                        setScore(updatedScore);
                    }}
                />

                <EnemiesIndex
                    config={config}
                    score={score}
                    onEnemyHit={(data)=>{
                        // fire an event although data.value may be the same
                        setIncrementScoreBy(0);
                        setIncrementScoreBy(data.value);
                    }}
                    onProtagonistHit={()=>{
                        console.log('hit');
                    }}
                />

                <PrizesIndex
                    config={config}
                    onProtagonistHit={()=>{
                        console.log('score hit');
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
