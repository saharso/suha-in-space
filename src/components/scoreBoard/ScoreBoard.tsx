import React, {useEffect} from 'react';
import ScoreBoardModel from '../../models/scoreBoard';
import useScoreBoardCalculator from './hooks/useScoreBoardCalculator';

const ScoreBoard: React.FunctionComponent<{[key: string]:ScoreBoardModel}> = ({update})=>{

    const scoreBoard = useScoreBoardCalculator();

    useEffect(()=>{
        if(!update?.score) return;
        scoreBoard.setScore(update.score);
    }, [update.score]);

    useEffect(()=>{
        console.log(scoreBoard.getScoreBoard);
    }, [scoreBoard.getScoreBoard]);
    
    return <header className="sis-scoreBoard">
        {scoreBoard.getScoreBoard.score || 0}
    </header>;
};

export default ScoreBoard;