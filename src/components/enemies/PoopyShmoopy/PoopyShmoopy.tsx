import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type IPoopyShmoopyProps = {
    config;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({config}) => {

    const enemiesHolderRef = useRef(null);

    useGenerateEnemies(enemiesHolderRef, config);
    
    return <div ref={enemiesHolderRef} className="sis-enemyList sis-poopyShmoopyList">
        <div className="sis-poopyShmoopy"></div>
    </div>;
};

export default PoopyShmoopy;