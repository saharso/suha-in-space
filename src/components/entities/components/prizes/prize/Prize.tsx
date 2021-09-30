import React, {useEffect, useRef} from 'react';
import './Prize.scss';
import useGeneratePrizes from '../hooks/useGeneratePrizes';

type TEnemyProps = {
    config;
    onLoad?: Function;
}

const Enemy: React.FunctionComponent<TEnemyProps> = ({config, onLoad}) => {

    const prizesHolderRef = useRef(null);

    const prize = useGeneratePrizes(prizesHolderRef, config);

    useEffect(()=>{
        if(!prize) return;
        onLoad && onLoad(prize);
    }, [prize]);

    return <div ref={prizesHolderRef} className={`sis-enemyList sis-${config.name}__list`}>
    </div>;
};

export default Enemy;