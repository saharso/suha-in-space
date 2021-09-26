import ConstantsEnum from '../../../global/consts/constants.enum';
import EnemyConfig from './enemies.config';

function getProtagonist(){
    return document.getElementById(ConstantsEnum.PROTAGONIST_ID);
}

function elementsOverlap(el1: HTMLElement, el2: HTMLElement): boolean {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const overlap = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
    return overlap;
}

function getRandomScreenXAxisPoint() {
    return Math.random() * window.innerWidth;
}
function removeElement(el) {
    if(!el) return;
    el.parentNode?.removeChild(el);
    el = null;
}

export default class Enemy extends EnemyConfig {
    firingRate = 1000;
    speed = 2000;
    private interval;
    private observer;
    private enemyOrigin;
    private virtualHolder = document.createElement('div');
    private enemyWrapper;
    private protagonistEl;

    constructor(enemyWrapper: HTMLElement, protagonistEl: HTMLElement, config?: Partial<EnemyConfig>) {
        super(config);
        this.enemyWrapper = enemyWrapper;
        this.protagonistEl = protagonistEl;
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

        const protagonist = getProtagonist();

        const originalStrength = this.strength;

        const onMutation = (mutationsList, observer) => {

            for(const mutation of mutationsList) {

                if (mutation.type === 'attributes') {
                    const enemies: NodeList = this.enemyWrapper.children;
                    enemies && Array.from(enemies).forEach((enemyItem: HTMLElement) => {
                        if(elementsOverlap(protagonist, enemyItem)){
                            this.onProtagonistHit();
                        }
                        if (mutation.target !== protagonist && elementsOverlap(mutation.target, enemyItem)) {

                            this.assignStrengthToEnemy(enemyItem, this.getEnemhyStrength(enemyItem) -1);

                            if(this.getEnemhyStrength(enemyItem) <= 0) {
                                removeElement(enemyItem);
                                this.onEnemyHit();
                                this.revert('strength');
                            }
                        }
                    });

                } else break;
            }
        };

        const observer = new MutationObserver(onMutation);

        observer.observe(this.protagonistEl, config);

        return observer;
    }

    private moveDownwards(enemy){
        requestAnimationFrame(()=>{
            enemy.style.top = '100%';
        });
        let timeout;
        timeout = setTimeout(()=>{
            removeElement(enemy);
            clearTimeout(timeout);
            this.revert('strength');
        }, this.speed);
    }

    private buildBasicEnemy(enemyModel: HTMLElement, leaveAfterMs){
        enemyModel.style.top = '-100px';
        enemyModel.style.transition = `top ${leaveAfterMs}ms linear`;
        enemyModel.style.left = getRandomScreenXAxisPoint() + 'px';
        return enemyModel;
    }

    private assignStrengthToEnemy(enemyModel: HTMLElement, value: number) {
        enemyModel.setAttribute('data-strength', '' + value);
    }

    private getEnemhyStrength(el: HTMLElement): number {
        return + el.getAttribute('data-strength');
    }
}
