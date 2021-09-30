import GlobalConfig from '../../../global/models/modelGlobalConfig';

export type TAim = 'down' | 'toProtagonist';

export default class EntityConfig extends GlobalConfig {

    name: string;

    generationRateMs: number = 2000;

    speed: number = 1000;

    strength: number = 3;

    aim: TAim = 'down';

    onProtagonistHit: Function = ()=>{}

    onEnemyHit: Function = ()=>{}

    constructor(override?: Partial<EntityConfig>){
        super();
        this.update(override);
    }
}