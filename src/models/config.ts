


export class ProtagonistConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){

        override && Object.keys(override).forEach((key)=>{
            this[key] = override[key];
        });
        
    }
};

export default class Config {
    protagonist = new ProtagonistConfig();
}