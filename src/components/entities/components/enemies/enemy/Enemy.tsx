import React, {useEffect, useRef} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './Enemy.scss';

type TEnemyProps = {
    config;
    onLoad?: Function;
}

const Enemy: React.FunctionComponent<TEnemyProps> = ({config, onLoad}) => {

    const enemiesHolderRef = useRef(null);

    const enemy = useGenerateEnemies(enemiesHolderRef, config);

    useEffect(()=>{
        if(!enemy) return;
        onLoad && onLoad(enemy);
    }, [enemy]);
    
    return <div ref={enemiesHolderRef} className={`sis-enemyList sis-${config.name}__list`}>
    </div>;
};

export default Enemy;