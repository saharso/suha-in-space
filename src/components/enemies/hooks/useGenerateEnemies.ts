import React, {useState, useEffect, useContext, useCallback} from 'react';
import AppContext from '../../../models/context';
import EnemyConfig from '../models/enemies.config';
import Enemy from '../models/MEnemy';


export default function useGenerateEnemies(ref, config: EnemyConfig): Enemy {
    const appContext = useContext(AppContext);

    const [enemy, setEnemy] = useState<Enemy>(null);
    
    useEffect(()=>{
        if(!(ref.current && appContext.protagonistEl)) return;
        
        const protagonistEl = appContext.protagonistEl;

        const enemy = new Enemy(ref.current, protagonistEl, {
            ...config,

        });

        setEnemy(enemy);

        return function(){
            
            enemy.kill();
            
        };        

    }, [ref.current, appContext.protagonistEl]);

    return enemy;

}