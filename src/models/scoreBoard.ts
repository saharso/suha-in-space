import overrideClassPropsTool from '../global/tools/overrideClassProps.tool';
import GlobalConfig from '../global/models/MGlobalConfig';

export default class ScoreBoardConfig extends GlobalConfig {
    lives: number;
    score: number;
    constructor(update?: Partial<ScoreBoardConfig>) {
        super();
        this.update(update);
    }
}