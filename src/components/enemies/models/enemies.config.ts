import GlobalConfig from '../../../global/models/MGlobalConfig';

export default class EnemyConfig extends GlobalConfig {

    name: string;

    timeUntilGoesAway: number = 1000;

    showOnScore: number = 0;

    generationRateMs: number = 2000;

    strength: number = 3;

    value: number = 100;

    onProtagonistHit: Function = ()=>{}

    onEnemyHit: Function = ()=>{}

    constructor(override?: Partial<EnemyConfig>){
        super();
        this.setOriginal(override);
        this.update(override);
    }
}