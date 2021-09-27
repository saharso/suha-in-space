import React, {useEffect, useState} from 'react';
import ScoreBoardModel from '../../models/scoreBoard';
import useScoreBoardCalculator from './hooks/useScoreBoardCalculator';

type ScoreBoardProps = {
    scoreIncrement: number;
    onScoreBoardUpdate?: Function;
}
const ScoreBoard: React.FunctionComponent<ScoreBoardProps> = ({scoreIncrement, onScoreBoardUpdate})=>{

    const scoreCalculator = useScoreBoardCalculator(scoreIncrement);

    useEffect(()=>{
        onScoreBoardUpdate && onScoreBoardUpdate(scoreCalculator.score);
    }, [scoreCalculator.score]);

    return <header className="sis-scoreBoard">
        {scoreCalculator.score || 0}
    </header>;
};

export default ScoreBoard;