import pipeOverrideProps from './pipes/pipeOverrideProps';

export default class ScoreBoardModel {
    lives: number;
    score: number;
    constructor(update?: Partial<ScoreBoardModel>) {
        pipeOverrideProps.call(this, update);
    }
}