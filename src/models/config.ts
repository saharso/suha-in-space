import overrideClassPropsTool from '../global/tools/overrideClassProps.tool';
import EnemyConfig from '../components/enemies/models/enemies.config';
import ScoreBoardConfig from './scoreBoard';
import GlobalConfig from '../global/models/modelGlobalConfig';

export class ProtagonistConfig extends GlobalConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){
        super();
        this.update(override);
    }
}

export default class Config extends GlobalConfig {
    protagonist = new ProtagonistConfig();
    scoreBoard = new ScoreBoardConfig();
    enemies = {
        poopyShmoopy: new EnemyConfig({
            name: 'poopyShmoopy',
        }),
    }
}