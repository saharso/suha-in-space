import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';

export default class BulletConfig {
    speed: number = 300;
    generationRate: number = 40;
    parentEl: HTMLElement;
    coordinates;
    constructor (config?: Partial<BulletConfig>){
        this.set(config);
    }
    set(config?: Partial<BulletConfig>){
        overrideClassPropsTool.call(this, config);
        return this;
    }
}