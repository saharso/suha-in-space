import React, {useState, useEffect, useContext, useCallback} from 'react';
import ProtagonistContext from '../models/protagonistContext';

export default function useFiringRate() {
    const config = useContext(ProtagonistContext);

    const [bullets, setBullets] = useState([]);
    
    const remove = useCallback((index)=>{
        setBullets(prev => {prev = prev.splice(index, 1); return [...prev];});
    }, []);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setBullets(prev => {prev.push(null); return [...prev];});
        }, config.firingRage);


        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {bullets, remove};
}