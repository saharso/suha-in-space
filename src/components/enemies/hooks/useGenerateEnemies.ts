import React, {useState, useEffect, useContext, useCallback} from 'react';
import { isConditionalExpression } from 'typescript';
import AppContext from '../../../models/context';
import ConstantsEnum from '../../../models/enum.constants';

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

function observeEnemyBulletRelations(protagonistEl, enemyRef, callback?: Function){

    const targetNode = protagonistEl;

    const config = { attributes: true, childList: true, subtree: true };

    const protagonist = getProtagonist();

    const onMutation = function(mutationsList, observer) {

        for(const mutation of mutationsList) {

            if (mutation.type === 'attributes') {

                const enemies: NodeList = enemyRef.children;

                enemies && Array.from(enemies).forEach((enemyItem: HTMLElement) => {
                    if(elementsOverlap(protagonist, enemyItem)){
                        callback && callback();
                    } 
                    if (elementsOverlap(mutation.target, enemyItem)) {
                        removeElement(enemyItem);
                    }
                });

            } else break;
        }
    };

    const observer = new MutationObserver(onMutation);   

    observer.observe(targetNode, config);

    return observer;
}

function getRandomScreenXAxisPoint() {
    return Math.random() * window.innerWidth;
}
function buildBasicEnemy(enemy: HTMLElement, leaveAfterMs){
    const enemyClone: HTMLElement = <HTMLElement>enemy.cloneNode(true);
    enemyClone.style.top = '-100px';
    enemyClone.style.transition = `top ${leaveAfterMs}ms linear`;
    enemyClone.style.left = getRandomScreenXAxisPoint() + 'px';
    return enemyClone;
}

function removeElement(el) {
    if(!el) return;
    el.parentNode?.removeChild(el);
    el = null;
}

function moveDownwards(enemy, leaveAfterMs){
    requestAnimationFrame(()=>{
        enemy.style.top = '100%';
    });
    let timeout;
    timeout = setTimeout(()=>{
        removeElement(enemy);
        clearTimeout(timeout);
    }, leaveAfterMs);
}

interface IEnemyConfig {
    firingRate: number;
    speed: number;
    onProtagonistHit: Function;
}
class Enemy implements IEnemyConfig {
    firingRate = 1000;
    speed = 2000;
    onProtagonistHit: Function;
    private interval;
    private observer;
    private enemyOrigin;
    private virtualHolder = document.createElement('div');
    private enemyWrapper;
    private protagonistEl;
    
    constructor(enemyWrapper: HTMLElement, protagonistEl: HTMLElement, config?: Partial<IEnemyConfig>) {
        this.enemyWrapper = enemyWrapper;
        this.protagonistEl = protagonistEl;
        Object.keys(config).forEach((key)=>{
            this[key] = config[key];
        });
        this.init();
    }

    private init() {
        this.enemyOrigin = this.enemyWrapper.firstChild;
        this.virtualHolder.appendChild(this.enemyOrigin);
        this.interval = setInterval(()=>{
            this.generateEnemies(this.enemyWrapper, this.enemyOrigin);
        }, this.firingRate);
        this.observer = observeEnemyBulletRelations(this.protagonistEl, this.enemyWrapper, this.onProtagonistHit);
    }

    public kill(){
        clearInterval(this.interval);
        this.observer.disconnect();
    }

    private generateEnemies (holder, enemyOrigin) {
        const enemy = buildBasicEnemy(enemyOrigin, this.speed);
        holder.appendChild(enemy);
        moveDownwards(enemy, this.speed);
    };
}

export default function useGenerateEnemies(ref) {
    const appContext = useContext(AppContext);
    
    useEffect(()=>{
        if(!(ref.current && appContext.protagonistEl)) return;
        
        const protagonistEl = appContext.protagonistEl;

        const enemy = new Enemy(ref.current, protagonistEl, {
            speed: 2000,
            firingRate: 3000,
            onProtagonistHit: ()=>{
                console.log('hit');
            }
        });

        return function(){
            
            enemy.kill();
            
        };        

    }, [ref.current, appContext.protagonistEl]);

}