import React, {useState, useEffect, useContext} from 'react';

const generationRate = 500;

export default function useFiringRate() {

    const [bullets, setBullets] = useState([]);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setBullets(prev => {prev.push(null); return [...prev];});
        }, generationRate);

        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {bullets, setBullets};
}