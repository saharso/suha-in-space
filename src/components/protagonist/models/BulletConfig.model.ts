import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';
import GlobalConfig from '../../../global/models/MGlobalConfig';

export default class BulletConfig extends GlobalConfig {
    speed: number = 300;
    generationRate: number = 40;
    parentEl: HTMLElement;
    coordinates;
    constructor (config?: Partial<BulletConfig>){
        super();
        this.override(config);
    }

}