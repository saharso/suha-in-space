import GlobalConfig from '../../../global/models/MGlobalConfig';

export type TAim = 'down' | 'toProtagonist';

export type TType = 'enemy' | 'prize';

export default class EntityConfig extends GlobalConfig {

    name: string;

    generationRateMs: number = 2000;

    speed: number = 1000;

    strength: number = 3;

    aim: TAim = 'down';

    type: TType;

    destroyOnImpact: boolean = true;

    content?: string;

    onProtagonistHit: Function = ()=>{}

    onEnemyHit: Function = ()=>{}

    constructor(override?: Partial<EntityConfig>){
        super();
        this.update(override);
    }
}