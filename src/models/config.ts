import EnemyConfig from '../components/entities/models/MEnemyConfig';
import EntityConfig from '../components/entities/models/MEntityConfig';
import ScoreBoardConfig from './scoreBoard';
import GlobalConfig from '../global/models/MGlobalConfig';
import PrizeConfig from '../components/entities/models/MPrizeConfig';

export class ProtagonistConfig extends GlobalConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){
        super();
        this.update(override);
    }
}
type enemyShouldAppearOnScoreRange = [number,number]
export interface IScene {scoreRange: enemyShouldAppearOnScoreRange, enemyConfig: EnemyConfig};
export type TScriptMap = Array<IScene>;

export enum PrizesEnum {
    ADD_LIVES = 'addLive',
    RAPID_FIRE = 'rapidFire'
}

export default class Config extends GlobalConfig {
    protagonist = new ProtagonistConfig();
    scoreBoard = new ScoreBoardConfig({
        lives: 3,
        score: 0,
    });
    enemies = {
        poopyShmoopy: new EnemyConfig({
            name: 'poopyShmoopy',
            strength: 1,
            aim: 'down',
            speed: 1500,
        }),
        kamikaze: new EnemyConfig({
            name: 'kamikaze',
            strength: 1,
            aim: 'toProtagonist',
        }),
        rainOfTerror: new EnemyConfig({
            name: 'rainOfTerror',
            strength: 1,
            generationRateMs: 150,
        }),
    }
    prizes = [
        new PrizeConfig({
            name: PrizesEnum.ADD_LIVES,
            content: '+',
        }),
        new PrizeConfig({
            name: PrizesEnum.RAPID_FIRE,
            content: 'R',
        }),
    ]
    script: TScriptMap = [
        {scoreRange: [0, Infinity], enemyConfig: this.enemies.poopyShmoopy},
        {scoreRange: [500, Infinity], enemyConfig: this.enemies.kamikaze},
        {scoreRange: [1000, Infinity], enemyConfig: this.enemies.rainOfTerror},
    ]

}