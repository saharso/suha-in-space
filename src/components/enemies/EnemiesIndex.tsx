import React, {useEffect, useState} from 'react';
import PoopyShmoopy from './PoopyShmoopy/PoopyShmoopy';


type TEnemiesIndexProps = {
    config: any;
    protagonistEl: HTMLElement;
    onProtagonistHit: Function;
    onEnemyHit: Function;
};

const EnemiesIndex: React.FunctionComponent<TEnemiesIndexProps> = (
    {
        config,
        protagonistEl,
        onProtagonistHit,
        onEnemyHit,
    }
) => {

    const [enemy, setEnemy] = useState(null);

    useEffect(()=>{
        if(!enemy) return;

        enemy.onProtagonistHit = ()=>{
            onProtagonistHit && onProtagonistHit();
        };
        enemy.onEnemyHit = ()=>{
            onEnemyHit && onEnemyHit(enemy);
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