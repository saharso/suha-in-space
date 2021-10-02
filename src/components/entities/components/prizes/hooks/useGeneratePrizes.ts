import Entity from '../../../models/MEntity';
import {useEffect} from 'react';

export default function useGeneratePrizes(prizesHolder: HTMLElement, prizes){

    useEffect(()=>{
        if(!prizesHolder || !prizes) return;

        let randomPrizesIndex = Math.floor(Math.random() * prizes.length);

        const prize = prizes[randomPrizesIndex];
        // prize.onProtagonistHit = ()=>{
        //     console.log('prize hit');
        // };
        setInterval(()=>{
            randomPrizesIndex = Math.floor(Math.random() * prizes.length);
        }, 200);

        setInterval(()=>{
            new Entity(prizesHolder, prizes[randomPrizesIndex]);
        },1000);
    }, [prizesHolder]);
    
    return true;
}