import React, {useEffect, useState} from 'react';
// import useUpdateEnemyListByScore from './hooks/useUpdateEnemyListByScore';


type TEnemiesIndexProps = {
    config: any;
    score: number;
    onProtagonistHit: Function;
    onEnemyHit: Function;
};

const PrizesIndex: React.FunctionComponent<TEnemiesIndexProps> = (
    {
        config,
        score,
        onProtagonistHit,
        onEnemyHit,
    }
) => {

    const [prize, setPrize] = useState(null);

    // const enemyList = useUpdateEnemyListByScore(score, config);

    useEffect(()=>{
        if(!prize) return;

        prize.onProtagonistHit = ()=>{
            onProtagonistHit && onProtagonistHit();
        };

    }, [prize]);


    return <>


    </>;
};

export default PrizesIndex;