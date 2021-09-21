import React, {useEffect, useState} from 'react';
import ScoreBoardModel from '../../models/scoreBoard';

const ScoreBoard: React.FunctionComponent<{[key: string]:ScoreBoardModel}> = ({update})=>{

    const [score, setScore] = useState(0);

    useEffect(()=>{
        if(!update?.score) return;
        setScore((prev)=> prev += update.score);
    }, [update]);

    return <header className="sis-scoreBoard">
        {score || 0}
    </header>;
};

export default ScoreBoard;