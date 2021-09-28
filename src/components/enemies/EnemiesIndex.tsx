import React, {useEffect, useState} from 'react';
import Enemy from './Enemy/Enemy';


type TEnemiesIndexProps = {
    config: any;
    score: number;
    onProtagonistHit: Function;
    onEnemyHit: Function;
};

const EnemiesIndex: React.FunctionComponent<TEnemiesIndexProps> = (
    {
        config,
        score,
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

    useEffect(()=>{
        console.log(score);
    }, [score]);

    return <>
        <Enemy
            config={config.enemies.poopyShmoopy}
            onLoad={(enemy)=>{setEnemy(enemy);}}
        />

    </>;
};

export default EnemiesIndex;