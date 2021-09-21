import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';

export default class EnemyConfig {

    name: string;

    timeUntilGoesAway: number = 1000;

    showOnScore: number = 0;

    generationRateMs: number = 2000;

    strength: number = 5;

    value: number = 100;

    onProtagonistHit: Function = ()=>{}

    onEnemyHit: Function = ()=>{}

    constructor(override?: Partial<EnemyConfig>){

        overrideClassPropsTool.call(this, override);

    }
}