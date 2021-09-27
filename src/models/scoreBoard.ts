import overrideClassPropsTool from '../global/tools/overrideClassProps.tool';
import GlobalConfig from '../global/models/modelGlobalConfig';

export default class ScoreBoardModel extends GlobalConfig {
    lives: number;
    score: number;
    constructor(update?: Partial<ScoreBoardModel>) {
        super();
        this.update(update);
    }
}