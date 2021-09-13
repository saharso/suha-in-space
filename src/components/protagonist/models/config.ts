


export default class ProtagonistConfig {

    trajectorySpeed: number = 500;

    firingRage: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){

        override && Object.keys(override).forEach((key)=>{
            this[key] = override[key];
        });
        
    }
};