import Entity from '../../../models/MEntity';
import {useEffect} from 'react';
import randomIndexWorker from './WorkerRandomNumber.js';


export default function useGeneratePrizes(prizesHolder: HTMLElement, prizes){

    useEffect(()=>{
        if(!prizesHolder || !prizes) return;

        const randomIndex = new Worker(randomIndexWorker);

        function onProtagonistHit(data){
            console.log('hit', data);
        }

        prizes.forEach((prize)=>{
            prize.onProtagonistHit = onProtagonistHit;
        });

        randomIndex.postMessage(prizes.length);

        let prize = prizes[0];

        randomIndex.onmessage = (e) => {
            prize = prizes[e.data];
            new Entity(prizesHolder, prize);
        };

    }, [prizesHolder]);
    
    return true;
}