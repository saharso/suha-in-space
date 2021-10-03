import React, {useState, useCallback, useEffect} from 'react';
import ScoreBoardConfig from '../../../models/scoreBoard';
import ScoreBoard from '../ScoreBoard';

export default function useScoreBoardCalculator(value: number){
    const [score, setScore] = useState(0);

    useEffect(()=>{
        setScore((prev)=> prev += value);
    }, [value]);

    return {score};
}