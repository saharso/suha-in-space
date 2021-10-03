import React, {useState, useEffect, useContext, useCallback} from 'react';
import AppContext from '../../../../../models/context';
import EnemyConfig from '../../../models/MEnemyConfig';
import Entity from '../../../models/MEntity';


export default function useGenerateEnemies(ref, config: EnemyConfig): Entity {
    const appContext = useContext(AppContext);

    const [enemy, setEnemy] = useState<Entity>(null);
    
    useEffect(()=>{
        if(!ref.current) return;
        console.log(ref.current);

        const enemy = new Entity(ref.current, {
            ...config,
        });

        setEnemy(enemy);

        return function(){
            
            enemy.destroy();
            
        };        

    }, [ref]);

    return enemy;

}