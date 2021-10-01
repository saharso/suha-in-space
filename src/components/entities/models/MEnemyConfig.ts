import EntityConfig from './MEntityConfig';

export default class EnemyConfig extends EntityConfig {

    showOnScore: number = 0;

    strength: number = 3;

    value: number = 100;

    constructor(override?: Partial<EnemyConfig>){
        super();
        this.update(override);
        this.type = 'enemy';
    }
}