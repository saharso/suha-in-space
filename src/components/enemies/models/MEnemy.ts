import ElementsUtil from '../../../global/models/modelElementsUtil';
import EnemyConfig from './enemies.config';


export default class Enemy extends EnemyConfig {
    firingRate = 1000;
    speed = 2000;
    private interval;
    private observer;
    private enemyOrigin;
    private virtualHolder = document.createElement('div');
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
        this.enemyOrigin = this.enemyWrapper.firstChild;
        this.virtualHolder.appendChild(this.enemyOrigin);
        this.interval = setInterval(()=>{
            this.generateEnemies(this.enemyWrapper, this.enemyOrigin);
        }, this.firingRate);
        this.observer = this.observeEnemyBulletRelations();
    }

    public kill(){
        clearInterval(this.interval);
        this.observer.disconnect();
    }

    private generateEnemies(holder, enemyOrigin) {
        const enemy = <HTMLElement>enemyOrigin.cloneNode(true);
        this.buildBasicEnemy(enemy, this.speed);
        this.assignStrengthToEnemy(enemy, this.strength);
        holder.appendChild(enemy);
        this.moveDownwards(enemy);
    }

    private observeEnemyBulletRelations(){

        const config = { attributes: true, childList: true, subtree: true };

        const onMutation = (mutationsList) => {

            for(const mutation of mutationsList) {

                if (mutation.type === 'attributes') {
                    const enemies: NodeList = this.enemyWrapper.children;
                    enemies && Array.from(enemies).forEach((enemyItem: HTMLElement) => {

                        if(this.shouldHitProtagonist(enemyItem)) {
                            this.onProtagonistImpact();
                        }

                        if (this.shouldImpactEnemy(mutation.target, enemyItem)) {
                            this.onEnemyImpact(mutation.target, enemyItem);
                        }

                    });

                } else break;
            }
        };

        const observer = new MutationObserver(onMutation);

        observer.observe(this.protagonistWrapper, config);

        return observer;
    }

    private shouldHitProtagonist(enemyItem) {
        const conditions = [
            ElementsUtil.isElementsOverlap(ElementsUtil.getProtagonist(), enemyItem),
            !ElementsUtil.isElementLeaving(enemyItem),
        ];

        return conditions.every(e=>e);
    }

    private shouldImpactEnemy(bullet, enemy) {
        const conditions = [
            bullet !== ElementsUtil.getProtagonist(),
            ElementsUtil.isElementsOverlap(bullet, enemy),
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
