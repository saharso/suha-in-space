import React, {useEffect, useRef, useState} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

function wasHit(mutation, enemyRef){
    const activeBUllet: HTMLElement = mutation.target;
    const enemy: HTMLElement = enemyRef.current;
    const bulletLeftPos = activeBUllet.getBoundingClientRect().left;
    const enemyLeftPos = enemy.getBoundingClientRect().left;
    const enemyRightPos = enemy.getBoundingClientRect().right;

    const hit = bulletLeftPos > enemyLeftPos && bulletLeftPos < enemyRightPos;

    return hit;
}

function observeEnemyBulletRelations(protagonistEl, enemyRef, callback: Function){
    
    const targetNode = protagonistEl;

    const config = { attributes: true, childList: true, subtree: true };

    const onMutation = function(mutationsList, observer) {
        for(const mutation of mutationsList) {

            if (mutation.type === 'attributes') {
                try {
                    const hit = wasHit(mutation, enemyRef);
                    if(hit) {
                        // callback();
                        observer.disconnect();
                    }
                } catch(e) {
                    observer.disconnect();
                }
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
  

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({protagonistEl}) => {

    const enemiesHolderRef = useRef(null);

    const enemyGeneration = useGenerateEnemies(enemiesHolderRef);
    
    return <div ref={enemiesHolderRef} className="sis-enemyWrapper--poopyShmoopy">

    </div>;
};

export default PoopyShmoopy;