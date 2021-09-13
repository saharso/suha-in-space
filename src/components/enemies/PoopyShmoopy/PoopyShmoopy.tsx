import React, {useEffect, useRef} from 'react';
import useGenerateEnemies from '../hooks/useGenerateEnemies';
import './PoopyShmoopy.scss';

type ISinglePoopyShmoopyProps = {
    protagonistEl: HTMLElement;
    onHit: () => void
}

function wasHit(mutation, enemyRef){
    const activeBUllet: HTMLElement = mutation.target;
    const enemy: HTMLElement = enemyRef.current;
    const bulletLeftPos = activeBUllet.getBoundingClientRect().left;
    const enemyLeftPos = enemy.getBoundingClientRect().left;
    const enemyRightPos = enemy.getBoundingClientRect().right;

    const hit = bulletLeftPos > enemyLeftPos && bulletLeftPos < enemyRightPos;

    return hit;
}
const SinglePoopyShmoopy: React.FunctionComponent<ISinglePoopyShmoopyProps> = ({protagonistEl, onHit}) => {

    const enemyRef = useRef(null);

    useEffect(()=>{
        if(!protagonistEl) return;

        // Select the node that will be observed for mutations
        const targetNode = protagonistEl;

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {

                if (mutation.type === 'attributes') {
                    try {
                        const hit = wasHit(mutation, enemyRef);
                        if(hit) {
                            onHit();
                            observer.disconnect();
                        }
                    } catch(e) {
                        observer.disconnect();
                    }
                } else break;
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);

        return ()=>{
            observer.disconnect();

        };  
    }, [protagonistEl]);

    return <div ref={enemyRef} className="sis-enemy sis-enemy--poopyShmoopy"></div>;
};

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({protagonistEl}) => {

    const enemyGeneration = useGenerateEnemies();

    return <div className="sis-enemyWrapper--poopyShmoopy">
        {enemyGeneration.amount.map((item, index) => {
            return (
                <SinglePoopyShmoopy
                    key={index}
                    protagonistEl={protagonistEl}
                    onHit={()=>{
                        enemyGeneration.remove(index);
                        console.log(index);
                    }}
                />
            );
        })}
    </div>;
};

export default PoopyShmoopy;