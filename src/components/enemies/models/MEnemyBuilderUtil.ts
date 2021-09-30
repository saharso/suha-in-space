import ElementsUtil from '../../../global/models/modelElementsUtil';

export default class EnemyBuilderUtil {

    static buildBasicEnemy(enemy: HTMLElement, speed: number){
        enemy.style.top = '-100px';
        enemy.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        enemy.style.left = ElementsUtil.getRandomScreenXAxisPoint() + 'px';
        return enemy;
    }

    static assignStrengthToEnemy(enemy: HTMLElement, value: number) {
        enemy.setAttribute('data-strength', '' + value);
    }

    static getEnemyStrength(el: HTMLElement): number {
        return + el.getAttribute('data-strength');
    }
}