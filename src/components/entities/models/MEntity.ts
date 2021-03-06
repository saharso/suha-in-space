import ElementsUtil from '../../../global/models/MElementsUtil';
import EntityConfig, {TAim} from './MEntityConfig';
import EntityMovement from './MEntityMovement';
import EntityBuilderUtil from './MEntityBuilderUtil';
import intervalWorker from '../../../global/workers/intervalWorker';

export default class Entity extends EntityConfig {
    private interval;
    private observer;
    private enemyModel = document.createElement('div');
    private wrapper;
    private allowProtagonistHit: boolean = true;
    private intervalWorker

    constructor(wrapper: HTMLElement, config?: Partial<EntityConfig>) {
        super(config);
        this.wrapper = wrapper;
        this.init();
    }

    private init() {
        this.enemyModel.className = `sis-entity sis-${this.type} sis-${this.type}--${this.name}`;
        this.enemyModel.setAttribute('data-type', this.type);
        this.enemyModel.setAttribute('data-name', this.name);
        this.initIntervalWorker();
        this.generateEntities();
        this.initObserver();
    }

    private initIntervalWorker(){
        if(!this.generationRateMs) return;
        this.intervalWorker = new Worker(intervalWorker);
        this.intervalWorker.postMessage(this.generationRateMs);
    }

    private initObserver(){
        this.observer = ElementsUtil.observe(
            ElementsUtil.getProtagonistWrapper(),
            this.wrapper.children,
            this.onMutation.bind(this),
        );
    }

    public destroy(){
        clearInterval(this.interval);
        this.observer.disconnect();
    }

    private generateEntities() {
        if(this.generationRateMs){
            this.intervalWorker.onmessage =()=>{
                this.generateSingleEntity(this.wrapper, this.enemyModel);
            };
        } else {
            this.generateSingleEntity(this.wrapper, this.enemyModel);
        }
    }

    private onMutation(mutation, enemyItem){
        if(this.shouldHitProtagonist(enemyItem)) {
            this.onProtagonistImpact(enemyItem);
        }

        if (this.shouldImpactEnemy(mutation.target, enemyItem)) {
            this.onEnemyImpact(mutation.target, enemyItem);
        }
    }

    private generateSingleEntity(holder, enemyOrigin) {
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

    private onProtagonistImpact(enemy){
        if(this.allowProtagonistHit) {
            this.onProtagonistHit(enemy.dataset);
            this.destroyOnImpact && ElementsUtil.removeElement(enemy);
            setTimeout(()=>{this.allowProtagonistHit = true;}, 700);
        }

        this.allowProtagonistHit = false;
    }

}
