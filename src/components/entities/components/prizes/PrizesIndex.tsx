import React, {useEffect, useRef, useState} from 'react';
import Prize from './prize/Prize';
import useGeneratePrizes from './hooks/useGeneratePrizes';
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

    const prizeListRef = useRef(null);

    const prizes = useGeneratePrizes(prizeListRef, config.prizes);

    useEffect(()=>{
        if(!prize) return;

        prize.onProtagonistHit = ()=>{
            onProtagonistHit && onProtagonistHit();
        };

    }, [prize]);


    return <div ref={prizeListRef} className="sis-prizeList">

        <Prize config={config.prizes[0]} />
    </div>;
};

export default PrizesIndex;