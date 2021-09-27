import React, {useEffect, useState} from 'react';
import ScoreBoardModel from '../../models/scoreBoard';
import useScoreBoardCalculator from './hooks/useScoreBoardCalculator';

const ScoreBoard: React.FunctionComponent<{[key: string]:ScoreBoardModel}> = ({update})=>{

    const scoreCalculator = useScoreBoardCalculator(update);



    return <header className="sis-scoreBoard">
        {scoreCalculator.score || 0}
    </header>;
};

export default ScoreBoard;