import React, {useState, useEffect, useContext, useCallback} from 'react';

const rate = 1000;

function wasHit(mutation, enemyRef){
    const activeBUllet: HTMLElement = mutation.target;
    const enemy: HTMLElement = enemyRef;
    const bulletLeftPos = activeBUllet.getBoundingClientRect().left;
    const enemyLeftPos = enemy.getBoundingClientRect().left;
    const enemyRightPos = enemy.getBoundingClientRect().right;

    const hit = bulletLeftPos > enemyLeftPos && bulletLeftPos < enemyRightPos;

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

function buildBasicEnemy(leaveAfterMs){
    const el = document.createElement('div');
    el.classList.add('sis-enemy--poopyShmoopy');
    el.style.top = '-100px';
    el.style.transition = `top ${leaveAfterMs}ms linear`;
    el.style.left = getRandomScreenXAxisPoint() + 'px';
    return el;
}

function removeElement(el) {
    if(!el) return;
    el.parentNode?.removeChild(el);
    el = null;
}

function moveEnemyDownwards(enemy, leaveAfterMs){
    requestAnimationFrame(()=>{
        enemy.style.top = '100%';
    });
    let timeout;
    timeout = setTimeout(()=>{
        removeElement(enemy);
        clearTimeout(timeout);
    }, leaveAfterMs);
}
const generateEnemy = (holder) => {
    const enemy = buildBasicEnemy(2000);
    holder.appendChild(enemy);
    moveEnemyDownwards(enemy, 2000);
};

export default function useGenerateEnemies(ref, protagonistEl) {
    
    useEffect(()=>{
        if(!(ref.current && protagonistEl)) return;

        const interval = setInterval(()=>{
            generateEnemy(ref.current);
        }, rate);

        const observer = observeEnemyBulletRelations(protagonistEl, ref.current);
        
        return function(){
            clearInterval(interval);
            observer.disconnect();
        };        

    }, [ref.current, protagonistEl]);

}