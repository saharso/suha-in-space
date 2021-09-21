import overrideClassPropsTool from '../global/tools/overrideClassProps.tool';

export default class ScoreBoardModel {
    lives: number;
    score: number;
    constructor(update?: Partial<ScoreBoardModel>) {
        overrideClassPropsTool.call(this, update);
    }
}