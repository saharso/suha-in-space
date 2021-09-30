import ElementsUtil from '../../../global/models/modelElementsUtil';
import EntityConfig, {TAim} from './MEntityConfig';
import EntityMovement from './MEntityMovement';
import EntityBuilderUtil from './MEntityBuilderUtil';


export default class Entity extends EntityConfig {
    private interval;
    private observer;
    private enemyModel = document.createElement('div');
    private enemyWrapper;
    private protagonistWrapper;
    private allowProtagonistHit: boolean = true;

    constructor(enemyWrapper: HTMLElement, protagonistEl: HTMLElement, config?: Partial<EntityConfig>) {
        super(config);
        this.enemyWrapper = enemyWrapper;
        this.protagonistWrapper = protagonistEl;
        this.init();
    }

    private init() {
        this.enemyModel.className = `sis-enemy sis-${this.name}`;

        this.interval = setInterval(()=>{
            this.generateEnemies(this.enemyWrapper, this.enemyModel);
        }, this.generationRateMs);

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
        const enemyClone = <HTMLElement>enemyOrigin.cloneNode(true);
        const enemy = EntityBuilderUtil.buildBasicEnemy(this, enemyClone);
        holder.appendChild(enemy);
        new EntityMovement(this, enemy);
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

        EntityBuilderUtil.assignStrengthToEnemy(enemy, EntityBuilderUtil.getEnemyStrength(enemy) -1);
        if(EntityBuilderUtil.getEnemyStrength(enemy) <= 0) {
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

}
