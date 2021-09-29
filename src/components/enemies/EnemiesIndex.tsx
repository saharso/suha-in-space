import React, {useEffect, useState} from 'react';
import Enemy from './Enemy/Enemy';
import {IScene} from '../../models/config';
import EnemyConfig from './models/enemies.config';
import useUpdateEnemyListByScore from './hooks/useUpdateEnemyListByScore';


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

    const enemyList = useUpdateEnemyListByScore(score, config);

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
        {enemyList.map((config: EnemyConfig)=>{
            return <Enemy
                key={config.name}
                config={config}
                onLoad={(enemy)=>{setEnemy(enemy);}}
            />;

        })}

    </>;
};

export default EnemiesIndex;