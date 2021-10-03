import React, {useEffect, useState} from 'react';
import ScoreBoardConfig from '../../models/scoreBoard';
import useScoreBoardCalculator from './hooks/useScoreBoardCalculator';

type ScoreBoardProps = {
    config: ScoreBoardConfig;
    scoreIncrement: number;
    onScoreBoardUpdate?: Function;
}
const ScoreBoard: React.FunctionComponent<ScoreBoardProps> = ({
    scoreIncrement,
    onScoreBoardUpdate,
    config
})=>{

    const scoreCalculator = useScoreBoardCalculator(scoreIncrement);

    useEffect(()=>{
        onScoreBoardUpdate && onScoreBoardUpdate(scoreCalculator.score);
    }, [scoreCalculator.score]);

    return <header className="sis-scoreBoard">

        <div className="sis-scoreBoard__score">
            {scoreCalculator.score || config.score}
        </div>

        <div className="sis-scoreBoard__lives">
            {config.lives}
        </div>

    </header>;
};

export default ScoreBoard;