import pipeOverrideProps from "./pipes/pipeOverrideProps";

export class ProtagonistConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){

        pipeOverrideProps.call(this, override);
    }
};

export default class Config {
    protagonist = new ProtagonistConfig();
}