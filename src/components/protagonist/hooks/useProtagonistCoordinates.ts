import React, {useState, useEffect} from 'react';
import ICoordinates from '../models/iCoordinates';

export default function useProtagonistCoordinates(protagonistRef): ICoordinates {
    
    const [left, setLeft] = useState<number>(0);
    const [top, setTop] = useState<number>(0);
    const [protagonistCenter, setProtagonistCenter] = useState<number>(0);

    function onMouseMove(e: MouseEvent) {
        if(!protagonistRef.current) return;

        const protagonistWidth = protagonistRef.current.clientWidth;
        
        const protagonistHeight = protagonistRef.current.clientWidth;   
        
        const left = e.clientX - protagonistWidth / 2;
        
        const top = e.clientY - protagonistHeight / 2;

        const protagonistCenter = e.clientX;
        
        setLeft(left);
        
        setTop(top);

        setProtagonistCenter(protagonistCenter);
    }

    useEffect(()=>{
        if(!protagonistRef.current) return;

        window.addEventListener('mousemove', onMouseMove);
        
        return function(){
            window.removeEventListener('mousemove', onMouseMove);
        };
        
    }, []);

    return {top, left, protagonistCenter};

}