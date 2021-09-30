import GlobalConfig from '../../../global/models/modelGlobalConfig';

export type TAim = 'down' | 'toProtagonist';

export default class EnemyConfig extends GlobalConfig {

    name: string;

    speed: number = 1000;

    showOnScore: number = 0;

    generationRateMs: number = 2000;

    strength: number = 3;

    value: number = 100;

    aim: TAim = 'down';

    onProtagonistHit: Function = ()=>{}

    onEnemyHit: Function = ()=>{}

    constructor(override?: Partial<EnemyConfig>){
        super();
        this.setOriginal(override);
        this.update(override);
    }
}