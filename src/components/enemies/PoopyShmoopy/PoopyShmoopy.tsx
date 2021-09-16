import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({protagonistEl}) => {

    const enemiesHolderRef = useRef(null);

    useGenerateEnemies(enemiesHolderRef, protagonistEl);
    
    return <div ref={enemiesHolderRef} className="sis-enemyWrapper--poopyShmoopy">

    </div>;
};

export default PoopyShmoopy;