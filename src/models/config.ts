import EntityConfig from '../components/entities/models/MEntityConfig';
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
export interface IScene {scoreRange: enemyShouldAppearOnScoreRange, enemyConfig: EntityConfig};
export type TScriptMap = Array<IScene>;

export default class Config extends GlobalConfig {
    protagonist = new ProtagonistConfig();
    scoreBoard = new ScoreBoardConfig();
    enemies = {
        poopyShmoopy: new EntityConfig({
            name: 'poopyShmoopy',
            strength: 3,
            aim: 'down',
            speed: 1500,
        }),
        kamikaze: new EntityConfig({
            name: 'kamikaze',
            strength: 1,
            aim: 'toProtagonist',
        }),
        rainOfTerror: new EntityConfig({
            name: 'rainOfTerror',
            strength: 1,
            generationRateMs: 150,
        }),
    }
    prizes = {
        addLive: new EntityConfig({
            name: 'addLive',
        })
    }
    script: TScriptMap = [
        {scoreRange: [0, Infinity], enemyConfig: this.enemies.poopyShmoopy},
        {scoreRange: [500, Infinity], enemyConfig: this.enemies.kamikaze},
        {scoreRange: [1000, Infinity], enemyConfig: this.enemies.rainOfTerror},
    ]


}