import EntityConfig, {TAim} from './MEntityConfig';
import ElementsUtil from '../../../global/models/MElementsUtil';

export default class EntityMovement extends EntityConfig {
    constructor(config: EntityConfig, enemy: HTMLElement) {
        super();
        this.update(config);
        this.moveEnmy(enemy);
    }

    private moveEnmy(enemy){
        type Aim = { [key in TAim]: any; };

        const aimIndex: Aim = {
            down: ()=>this.moveDownwards(enemy),
            toProtagonist: ()=>this.moveToProtagonist(enemy)
        };
        return aimIndex[this.aim]();
    }

    private moveDownwards(enemy){
        requestAnimationFrame(()=>{
            enemy.style.top = '100%';
        });
        this.removeEnemy(enemy);
    }

    private moveToProtagonist(enemy){
        const protagonistRect = ElementsUtil.getProtagonist().getBoundingClientRect();
        requestAnimationFrame(()=>{
            enemy.style.top = '100%';
            enemy.style.left = protagonistRect.left + 'px';
        });
        this.removeEnemy(enemy);
    }
    private removeEnemy(enemy){
        let timeout;
        timeout = setTimeout(()=>{
            ElementsUtil.removeElement(enemy);
            clearTimeout(timeout);
        }, this.speed);
    }
}