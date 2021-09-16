import React, {useState, useEffect, useContext, useCallback} from 'react';
import { isConditionalExpression } from 'typescript';
import AppContext from '../../../models/context';

const rate = 1000;

function wasHit(mutation, enemyRef){
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
                console.log(enemies);
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
function generateEnemies (holder, enemyOrigin) {
    const enemy = buildBasicEnemy(enemyOrigin, 2000);
    holder.appendChild(enemy);
    moveDownwards(enemy, 2000);
};

let interval;
let observer;
let enemyOrigin;
const virtualHolder = document.createElement('div');
function init(el, protagonistEl){
    enemyOrigin = el.firstChild;
    virtualHolder.appendChild(enemyOrigin);
    interval = setInterval(()=>{
        generateEnemies(el, enemyOrigin);
    }, rate);
    observer = observeEnemyBulletRelations(protagonistEl, el);
}

function kill() {
    clearInterval(interval);
    observer.disconnect();
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
        this.init();
    }

    private init() {
        this.enemyOrigin = this.enemyWrapper.firstChild;
        this.virtualHolder.appendChild(this.enemyOrigin);
        this.interval = setInterval(()=>{
            generateEnemies(this.enemyWrapper, this.enemyOrigin);
        }, rate);
        this.observer = observeEnemyBulletRelations(this.protagonistEl, this.enemyWrapper);
    } 
}

export default function useGenerateEnemies(ref) {
    const appContext = useContext(AppContext);
    
    useEffect(()=>{
        if(!(ref.current && appContext.protagonistEl)) return;
        
        const protagonistEl = appContext.protagonistEl;

        // init(ref.current, protagonistEl);

        new Enemy(ref.current, protagonistEl, {});

        return function(){
            
            kill();
            
        };        

    }, [ref.current, appContext.protagonistEl]);

}