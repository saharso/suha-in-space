import React, {useState, useCallback, useEffect} from 'react';
import ScoreBoardModel from '../../../models/scoreBoard';
import ScoreBoard from '../ScoreBoard';

export default function useScoreBoardCalculator(update){
    const [score, setScore] = useState(0);

    useEffect(()=>{
        if(!update?.score) return;
        setScore((prev)=> prev += update.score);
    }, [update]);

    return {score};
}