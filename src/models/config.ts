import overrideClassPropsTool from '../global/tools/overrideClassProps.tool';
import EnemyConfig from '../components/enemies/models/enemies.config';

export class ProtagonistConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){

        overrideClassPropsTool.call(this, override);

    }
}

export default class Config {
    protagonist = new ProtagonistConfig();
    enemies = {
        poopyShmoopy: new EnemyConfig({
            name: 'poopyShmoopy',
        }),
    }
}