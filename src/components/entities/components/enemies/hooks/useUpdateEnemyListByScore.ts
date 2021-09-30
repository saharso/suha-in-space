import {useEffect, useState} from 'react';
import {IScene} from '../../../../../models/config';
import EntityConfig from '../../../models/MEntityConfig';

export default function useUpdateEnemyListByScore(score, config){

    const [enemyList, setEnemyList] = useState<EntityConfig[]>([]);

    function shouldEnemyAppear(item: IScene): boolean {
        const fromScore = item.scoreRange[0];
        const toScore = item.scoreRange[1];
        const isScoreInRange = score >= fromScore && score <= toScore;

        return isScoreInRange;
    }

    useEffect(()=>{
        const _enemyList = config.script
            .filter(shouldEnemyAppear)
            .map((item: IScene): EntityConfig => item.enemyConfig);

        setEnemyList(_enemyList);
    }, [score]);

    return enemyList;
}
