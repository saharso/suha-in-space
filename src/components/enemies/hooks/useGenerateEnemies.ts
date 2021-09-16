import React, {useState, useEffect, useContext, useCallback} from 'react';
import { isConditionalExpression } from 'typescript';
import AppContext from '../../../models/context';
import ConstantsEnum from '../../../models/enum.constants';

const rate = 1000;

function wasHit(mutation, enemyRef){
    if(mutation.target.id === ConstantsEnum.PROTAGONIST_ID) return;
    const activeBUllet: HTMLElement = mutation.target;
    const enemy: HTMLElement = enemyRef;
    const bulletLeftPos = activeBUllet.getBoundingClientRect().left;
    const bulletRightPos = activeBUllet.getBoundingClientRect().right;
    const enemyLeftPos = enemy.getBoundingClientRect().left;
    const enemyRightPos = enemy.getBoundingClientRect().right;

    const hit = bulletRightPos > enemyLeftPos && bulletLeftPos < enemyRightPos;

    return hit;
}

function observeEnemyBulletRelations(protagonistEl, enemyRef, callback?: Function){

    const targetNode = protagonistEl;

    const config = { attributes: true, childList: true, subtree: true };

    const onMutation = function(mutationsList, observer) {

        for(const mutation of mutationsList) {

            if (mutation.type === 'attributes') {

                const enemies = enemyRef.children;

                enemies && Array.from(enemies).forEach(enemyItem => {
                    if(wasHit(mutation, enemyItem)) {
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
}
class Enemy implements IEnemyConfig {
    firingRate = 1000;
    speed = 2000;
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
        }, rate);
        this.observer = observeEnemyBulletRelations(this.protagonistEl, this.enemyWrapper);
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
        });

        return function(){
            
            enemy.kill();
            
        };        

    }, [ref.current, appContext.protagonistEl]);

}