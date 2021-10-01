import React, {useEffect, useRef} from 'react';
import './Prize.scss';
import useGeneratePrizes from '../hooks/useGeneratePrizes';
import Config from '../../../../../models/config';
import EntityConfig from '../../../models/MEntityConfig';
import PrizeConfig from '../../../models/MPrizeConfig';

type TEnemyProps = {
    config: PrizeConfig;
    onLoad?: Function;
}

const Prize: React.FunctionComponent<TEnemyProps> = ({config, onLoad}) => {

    const prizesHolderRef = useRef(null);

    const prize = useGeneratePrizes(prizesHolderRef.current, config);

    useEffect(()=>{
        if(!prize) return;
        onLoad && onLoad(prize);
    }, [prize]);

    return <div ref={prizesHolderRef} className={`sis-prizesList sis-${config.name}__list`}>
        <div className={`sis-prize sis-prize--${config.name}`}><span>{config.content}</span></div>
    </div>;
};

export default Prize;