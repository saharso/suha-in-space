import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';
import GlobalConfig from '../../../global/models/MGlobalConfig';
import ICoordinates from './iCoordinates';

export default class BulletConfig extends GlobalConfig {
    speed: number = 300;
    generationRate: number = 40;
    parentEl: HTMLElement;
    coordinates: ICoordinates;
    strength: number = 1;
    constructor (config?: Partial<BulletConfig>){
        super();
        this.update(config);
    }

}