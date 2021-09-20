import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type IPoopyShmoopyProps = {
    config;
    onHit?: Function;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({config, onHit}) => {

    const enemiesHolderRef = useRef(null);

    useGenerateEnemies(enemiesHolderRef, config, onHit);
    
    return <div ref={enemiesHolderRef} className="sis-enemyList sis-poopyShmoopyList">
        <div className="sis-poopyShmoopy"></div>
    </div>;
};

export default PoopyShmoopy;