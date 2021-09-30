import ElementsUtil from '../../../global/models/modelElementsUtil';
import EnemyConfig from './MEnemyConfig';


export default class Enemy extends EnemyConfig {
    firingRate = 1000;
    speed = 2000;
    private interval;
    private observer;
    private enemyModel = document.createElement('div');
    private enemyWrapper;
    private protagonistWrapper;
    private allowProtagonistHit: boolean = true;

    constructor(enemyWrapper: HTMLElement, protagonistEl: HTMLElement, config?: Partial<EnemyConfig>) {
        super(config);
        this.enemyWrapper = enemyWrapper;
        this.protagonistWrapper = protagonistEl;
        this.init();
    }

    private init() {
        this.enemyModel.className = `sis-enemy sis-${this.name}`;
        this.interval = setInterval(()=>{
            this.generateEnemies(this.enemyWrapper, this.enemyModel);
        }, this.firingRate);
        this.observer = ElementsUtil.observe(
            this.protagonistWrapper,
            this.enemyWrapper.children,
            this.onMutation.bind(this),
        );
    }

    public kill(){
        clearInterval(this.interval);
        this.observer.disconnect();
    }

    private onMutation(mutation, enemyItem){
        if(this.shouldHitProtagonist(enemyItem)) {
            this.onProtagonistImpact();
        }

        if (this.shouldImpactEnemy(mutation.target, enemyItem)) {
            this.onEnemyImpact(mutation.target, enemyItem);
        }
    }

    private generateEnemies(holder, enemyOrigin) {
        const enemy = <HTMLElement>enemyOrigin.cloneNode(true);
        this.buildBasicEnemy(enemy, this.speed);
        this.assignStrengthToEnemy(enemy, this.strength);
        holder.appendChild(enemy);
        this.moveDownwards(enemy);
    }

    private shouldHitProtagonist(enemy) {
        const conditions = [
            ElementsUtil.isElementsOverlap(ElementsUtil.getProtagonist(), enemy),
            !ElementsUtil.isElementLeaving(enemy),
        ];

        return conditions.every(e=>e);
    }

    private shouldImpactEnemy(bullet, enemy) {
        const conditions = [
            bullet !== ElementsUtil.getProtagonist(),
            ElementsUtil.isElementsOverlap(bullet, enemy),
            !ElementsUtil.isElementLeaving(enemy),
        ];

        return conditions.every(e=>e);
    }

    private onEnemyImpact(bullet: HTMLElement, enemy: HTMLElement) {
        ElementsUtil.removeElement(bullet);

        this.assignStrengthToEnemy(enemy, this.getEnemhyStrength(enemy) -1);
        if(this.getEnemhyStrength(enemy) <= 0) {
            ElementsUtil.removeElement(enemy, 500);
            this.onEnemyHit();
        }
    }

    private onProtagonistImpact(){
        if(this.allowProtagonistHit) {
            this.onProtagonistHit();
            setTimeout(()=>{this.allowProtagonistHit = true;}, 700);
        }

        this.allowProtagonistHit = false;
    }

    private moveDownwards(enemy){
        requestAnimationFrame(()=>{
            enemy.style.top = '100%';
        });
        let timeout;
        timeout = setTimeout(()=>{
            ElementsUtil.removeElement(enemy);
            clearTimeout(timeout);
            this.revert('strength');
        }, this.speed);
    }

    private buildBasicEnemy(enemyModel: HTMLElement, leaveAfterMs){
        enemyModel.style.top = '-100px';
        enemyModel.style.transition = `top ${leaveAfterMs}ms linear`;
        enemyModel.style.left = ElementsUtil.getRandomScreenXAxisPoint() + 'px';
        return enemyModel;
    }

    private assignStrengthToEnemy(enemyModel: HTMLElement, value: number) {
        enemyModel.setAttribute('data-strength', '' + value);
    }

    private getEnemhyStrength(el: HTMLElement): number {
        return + el.getAttribute('data-strength');
    }
}
