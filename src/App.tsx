import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import Background from './components/background/Background';
import ConstantsEnum from './global/consts/constants.enum';
import AppContext from './models/context';
import Protagonist from './components/protagonist/Protagonist';
import Config, {PrizesEnum} from './models/config';
import EnemiesIndex from './components/entities/components/enemies/EnemiesIndex';
import ScoreBoard from './components/scoreBoard/ScoreBoard';
import Prizes from './components/entities/components/prizes/Prizes';
import PrizeConfig from './components/entities/models/MPrizeConfig';
import ScoreBoardConfig from './models/scoreBoard';

const config = new Config();

function App() {
    
    const [protagonistEl, setProtagonistEl] = useState(null);

    const [incrementScoreBy, setIncrementScoreBy] = useState<number>(0);

    const [score, setScore] = useState<number>(0);

    const [scoreBoard, setScoreBoard] = useState<ScoreBoardConfig>(config.scoreBoard);

    function updateScoreBoardLives(prev, value: -1 | 1){
        return new ScoreBoardConfig({
            ...config.scoreBoard,
            lives: prev.lives + value
        });
    }

    return (
        <AppContext.Provider value={{protagonistEl}}>

            <div id={ConstantsEnum.ARENA_ID} className="sis">
                
                <Background/>

                <ScoreBoard
                    config={scoreBoard}
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
                        setScoreBoard(
                            (prev) => {
                                return updateScoreBoardLives(prev, -1);
                            }
                        );
                    }}
                />

                <Prizes
                    config={config}
                    onProtagonistHit={(data)=>{
                        if (data.name === PrizesEnum.ADD_LIVES) {
                            setScoreBoard(
                                (prev) => {
                                    return updateScoreBoardLives(prev, 1);
                                }
                            );
                        }
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
