import overrideClassPropsTool from '../tools/overrideClassProps.tool';
import IPojo from './IPojo';

export default class GlobalConfig {

    update(config?: IPojo){
        overrideClassPropsTool.call(this, config);
        return this;
    }
}