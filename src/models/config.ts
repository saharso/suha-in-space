import pipeOverrideProps from './pipes/pipeOverrideProps';

export class ProtagonistConfig {

    trajectorySpeed: number = 500;

    firingRate: number = 200;

    constructor(override?: Partial<ProtagonistConfig>){

        pipeOverrideProps.call(this, override);

    }
}

export class EnemyConfig {

    name: string;

    timeUntilGoesAway: number = 1000;

    showOnScore: number = 0;

    generationRateMs: number = 2000;

    strength: number = 5;

    value: number = 100;

    constructor(override?: Partial<EnemyConfig>){

        pipeOverrideProps.call(this, override);

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

console.log(new Config());