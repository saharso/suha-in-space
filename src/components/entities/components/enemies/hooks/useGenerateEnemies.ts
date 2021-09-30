import React, {useState, useEffect, useContext, useCallback} from 'react';
import AppContext from '../../../../../models/context';
import EntityConfig from '../../../models/MEntityConfig';
import Entity from '../../../models/MEntity';


export default function useGenerateEnemies(ref, config: EntityConfig): Entity {
    const appContext = useContext(AppContext);

    const [enemy, setEnemy] = useState<Entity>(null);
    
    useEffect(()=>{
        if(!(ref.current && appContext.protagonistEl)) return;

        const protagonistEl = appContext.protagonistEl;

        const enemy = new Entity(ref.current, protagonistEl, {
            ...config,
        });

        setEnemy(enemy);

        return function(){
            
            enemy.kill();
            
        };        

    }, [ref.current, appContext.protagonistEl]);

    return enemy;

}