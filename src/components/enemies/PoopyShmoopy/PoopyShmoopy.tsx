import React, {useEffect, useRef} from 'react';
import './PoopyShmoopy.scss';

type ISinglePoopyShmoopyProps = {
    protagonistEl: HTMLElement;
    onHit: () => void
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
                    console.log(mutation.target);
                    const activeBUllet: HTMLElement = mutation.target;
                    const enemy: HTMLElement = enemyRef.current;
                    const bulletLeftPos = activeBUllet.getBoundingClientRect().left;
                    const enemyLeftPos = enemy.getBoundingClientRect().left;
                    const enemyRightPos = enemy.getBoundingClientRect().right;

                    const hit = bulletLeftPos > enemyLeftPos && bulletLeftPos < enemyRightPos;

                    if(hit) {
                        onHit();
                        observer.disconnect();
                    }

                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
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

    return <>
        <SinglePoopyShmoopy
            protagonistEl={protagonistEl}
            onHit={()=>{
                console.log('hit!');
            }}
        />
    </>;
};

export default PoopyShmoopy;