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
type enemyShouldAppearOnScoreRange = [number,number]
export type TScene = [enemyShouldAppearOnScoreRange, EnemyConfig];
export type TScriptMap = Array<TScene>;

export default class Config extends GlobalConfig {
    protagonist = new ProtagonistConfig();
    scoreBoard = new ScoreBoardConfig();
    enemies = {
        poopyShmoopy: new EnemyConfig({
            name: 'poopyShmoopy',
            strength: 1,
        }),
        kamikaze: new EnemyConfig({
            name: 'kamikaze',
        }),
    }
    script: TScriptMap = [
        [[0, Infinity], this.enemies.poopyShmoopy],
        [[300, Infinity], this.enemies.kamikaze],
    ]


}