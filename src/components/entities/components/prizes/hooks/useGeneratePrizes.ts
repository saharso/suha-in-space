import Entity from '../../../models/MEntity';
import {useEffect, useState} from 'react';
import randomIndexWorker from '../../../../../global/workers/randomIntervalWorker.js';


export default function useGeneratePrizes(prizesHolder: HTMLElement, prizes){

    const [prize, setPrize] = useState(null);

    useEffect(()=>{
        if(!prizesHolder || !prizes) return;

        const randomInterval = new Worker(randomIndexWorker);

        function onProtagonistHit(_prize) {
            console.log(_prize);
            setPrize(_prize);
        }

        prizes.forEach((prize)=>{
            prize.onProtagonistHit = onProtagonistHit;
        });

        randomInterval.postMessage(prizes.length);

        let prize = prizes[0];

        randomInterval.onmessage = (e) => {
            prize = prizes[e.data];
            new Entity(prizesHolder, prize);
        };

    }, [prizesHolder]);
    
    return prize;
}