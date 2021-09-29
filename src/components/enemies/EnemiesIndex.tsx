import React, {useEffect, useState} from 'react';
import Enemy from './Enemy/Enemy';
import {IScene} from '../../models/config';
import EnemyConfig from './models/enemies.config';


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

    const [enemyList, setEnemyList] = useState<EnemyConfig[]>([]);

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
        const _enemyList = config.script.filter((item: IScene)=>{
            const fromScore = item.scoreRange[0];
            const toScore = item.scoreRange[1];
            const isScoreInRange = score >= fromScore && score <= toScore;

            return isScoreInRange;
        }).map((item: IScene) => item.enemyConfig);
        console.log(score);
        console.log(_enemyList);
        setEnemyList(_enemyList);
    }, [score]);

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