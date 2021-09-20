import React, {useEffect, useState} from 'react';
import PoopyShmoopy from './PoopyShmoopy/PoopyShmoopy';


type TEnemiesIndexProps = {
    config: any;
    protagonistEl: HTMLElement;
};

const EnemiesIndex: React.FunctionComponent<TEnemiesIndexProps> = ({config, protagonistEl}) => {

    const [enemy, setEnemy] = useState(null);

    useEffect(()=>{
        if(!enemy) return;

        enemy.onProtagonistHit = ()=>{
            console.log('hit');
        };
        enemy.onEnemyHit = ()=>{
            console.log(config);
        };

    }, [enemy]);

    return <>
        <PoopyShmoopy
            config={config.enemies.poopyShmoopy}
            onLoad={(enemy)=>{setEnemy(enemy);}}
        />

    </>;
};

export default EnemiesIndex;