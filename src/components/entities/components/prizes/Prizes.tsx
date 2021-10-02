import React, {useEffect, useRef, useState} from 'react';
import useGeneratePrizes from './hooks/useGeneratePrizes';
import './Prizes.scss';

type TEnemiesIndexProps = {
    config;
    onProtagonistHit: Function;
};

const Prizes: React.FunctionComponent<TEnemiesIndexProps> = (
    {
        config,
        onProtagonistHit,
    }
) => {

    const [prize, setPrize] = useState(null);

    const prizeListRef = useRef(null);

    const prizes = useGeneratePrizes(prizeListRef.current, config.prizes);

    useEffect(()=>{
        if(!prize) return;

        prize.onProtagonistHit = ()=>{
            onProtagonistHit && onProtagonistHit();
        };

    }, [prize]);


    return <div ref={prizeListRef} className="sis-prizeList">

    </div>;
};

export default Prizes;