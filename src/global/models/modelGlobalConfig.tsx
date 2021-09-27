import overrideClassPropsTool from '../tools/overrideClassProps.tool';
import IPojo from './IPojo';

export default class GlobalConfig {
    #_original;
    constructor() {
    }
    update(config?: IPojo){
        overrideClassPropsTool.call(this, config);
        return this;
    }
    revert(prop: string){
        if(this[prop]) {
            this[prop] = this.#_original[prop];
        }
    }
    setOriginal(config?: IPojo){
        if(this.#_original) return console.warn('original can only be set on instantiation');
        this.#_original = {...config};
    }
}