import React, {useEffect, useState} from 'react';
import Prize from './prize/Prize';
// import useUpdateEnemyListByScore from './hooks/useUpdateEnemyListByScore';

type TEnemiesIndexProps = {
    config;
    onProtagonistHit: Function;
};

const PrizesIndex: React.FunctionComponent<TEnemiesIndexProps> = (
    {
        config,
        onProtagonistHit,
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

        <Prize config={config.prizes.addLive} />
    </>;
};

export default PrizesIndex;