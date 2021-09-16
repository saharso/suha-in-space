import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = () => {

    const enemiesHolderRef = useRef(null);

    useGenerateEnemies(enemiesHolderRef);
    
    return <div ref={enemiesHolderRef} className="sis-enemyList sis-poopyShmoopyList">
        <div className="sis-poopyShmoopy"></div>
    </div>;
};

export default PoopyShmoopy;