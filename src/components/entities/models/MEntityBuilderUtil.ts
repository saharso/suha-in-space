import ElementsUtil from '../../../global/models/modelElementsUtil';
import EntityConfig from './MEntityConfig';

export default class EntityBuilderUtil {

    static buildBasicEnemy(config: EntityConfig, enemy: HTMLElement){
        enemy.style.top = '-100px';
        enemy.style.transition = `top ${config.speed}ms linear, left ${config.speed}ms linear`;
        enemy.style.left = ElementsUtil.getRandomScreenXAxisPoint() + 'px';
        EntityBuilderUtil.assignStrengthToEnemy(enemy, config.strength);
        return enemy;
    }

    static assignStrengthToEnemy(enemy: HTMLElement, strength: number) {
        enemy.setAttribute('data-strength', '' + strength);
    }

    static getEnemyStrength(el: HTMLElement): number {
        return + el.getAttribute('data-strength');
    }
}