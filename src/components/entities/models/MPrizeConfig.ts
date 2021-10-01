import EntityConfig from './MEntityConfig';

export default class PrizeConfig extends EntityConfig {
    content: string = '';
    constructor(config?: Partial<PrizeConfig>) {
        super();
        this.update(config);
        this.type = 'prize';
    }
}