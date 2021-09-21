import React, {useState, useCallback} from 'react';
import ScoreBoardModel from '../../../models/scoreBoard';
import ScoreBoard from '../ScoreBoard';

export default function useScoreBoardCalculator(){
    const [score, _setScore] = useState<number>(0);
    const [scoreBoard, setScoreBoard] = useState(new ScoreBoardModel());

    const setScore = useCallback((update) => {
        _setScore(prev => prev += update);
        setScoreBoard(new ScoreBoardModel({score}));
    }, []);

    return {
        setScore,
        getScoreBoard: scoreBoard,
    };
}