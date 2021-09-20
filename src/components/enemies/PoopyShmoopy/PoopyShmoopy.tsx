import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type IPoopyShmoopyProps = {
    config;
    onLoad?: Function;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({config, onLoad}) => {

    const enemiesHolderRef = useRef(null);

    const enemy = useGenerateEnemies(enemiesHolderRef, config);

    useEffect(()=>{
        if(!enemy) return;
        onLoad && onLoad(enemy);
    }, [enemy]);
    
    return <div ref={enemiesHolderRef} className="sis-enemyList sis-poopyShmoopyList">
        <div className="sis-poopyShmoopy"></div>
    </div>;
};

export default PoopyShmoopy;