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

    const prizeListRef = useRef(null);

    const prize = useGeneratePrizes(prizeListRef.current, config.prizes);

    useEffect(()=>{
        if(!prize) return;

        onProtagonistHit(prize);

    }, [prize]);


    return <div ref={prizeListRef} className="sis-prizeList">

    </div>;
};

export default Prizes;