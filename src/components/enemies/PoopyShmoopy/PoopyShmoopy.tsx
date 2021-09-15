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
  
const timeEnemyOnScreen = 1900;

type ISinglePoopyShmoopyProps = {
    protagonistEl: HTMLElement;
    onHit?: (string) => void;
    onLeaveScreen: (string) => void;
    id: string;
}
const SinglePoopyShmoopy: React.FunctionComponent<ISinglePoopyShmoopyProps> = ({protagonistEl, onHit, onLeaveScreen, id}) => {

    const enemyRef = useRef(null);

    const [enemyLocation, setEnemyLocation] = useState(null);
    const [top, setTop] = useState(-50);

    useEffect(()=>{
        if(!protagonistEl) return;

        const observer = observeEnemyBulletRelations(protagonistEl, enemyRef, ()=>{onHit(id);});

        return ()=>{
            observer.disconnect();
        };

    }, [protagonistEl]);

    useEffect(()=>{

        setEnemyLocation(getRandomScreenXAxisPoint());

        const leaveTimeout = setTimeout(()=>{
            onLeaveScreen(id);
        }, timeEnemyOnScreen);

        const animationTimeout = setTimeout(()=>{
            setTop(window.innerHeight + 50);
        }, 20);

        return function() {

            clearTimeout(leaveTimeout);
            clearTimeout(animationTimeout);
             
        };
    }, []);

    return <div 
        ref={enemyRef}
        style={{
            left: `${enemyLocation}px`,
            top: `${top}px`,
            transition: `top ${timeEnemyOnScreen}ms linear`,
        }}
        className="sis-enemy sis-enemy--poopyShmoopy"
    >{id}</div>;
};

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({protagonistEl}) => {

    const enemyGeneration = useGenerateEnemies();
    console.log(enemyGeneration.amount);
    return <div className="sis-enemyWrapper--poopyShmoopy">
        {enemyGeneration.amount.map((item, index) => {
            return (
                <SinglePoopyShmoopy
                    key={index}
                    id={item}
                    protagonistEl={protagonistEl}
                    onLeaveScreen={(id)=>{
                        enemyGeneration.remove(id);
                    }}
                />
            );
        })}
    </div>;
};

export default PoopyShmoopy;