import React, {useState, useEffect} from 'react';

export default function useProtagonistCoordinates(protagonistRef){
    
    const [left, setLeft] = useState<number>(0);
    const [top, setTop] = useState<number>(0);

    function onMouseMove(e: MouseEvent) {
        if(!protagonistRef.current) return;
        const protagonistWidth = protagonistRef.current.clientWidth;
        const protagonistHeight = protagonistRef.current.clientWidth;   
        const x = e.clientX - protagonistWidth / 2;
        const y = e.clientY - protagonistHeight / 2;
        setLeft(x);
        setTop(y);
    }

    useEffect(()=>{
        if(!protagonistRef.current) return;
        window.addEventListener('mousemove', onMouseMove);
        return function(){
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return {top, left};

}