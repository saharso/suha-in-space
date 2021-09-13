import React, {useState, useEffect, useContext} from 'react';
import ProtagonistContext from '../models/protagonistContext';

export default function useFiringRate() {
    const config = useContext(ProtagonistContext);

    const [bullets, setBullets] = useState([]);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setBullets(prev => {prev.push(null); return [...prev];});
        }, config.firingRage);

        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {bullets, setBullets};
}