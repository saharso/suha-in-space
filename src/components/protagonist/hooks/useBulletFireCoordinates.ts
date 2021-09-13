import React, {useState, useEffect, useContext} from 'react';
import ProtagonistContext from '../models/protagonistContext';

export default function useBulletFireCoordinates(coordinates) {

    const config = useContext(ProtagonistContext);

    const [top, setTop] = useState(coordinates.top);

    const [screenLeaveFlag, setScreenLeaveFlag] = useState(false);

    useEffect(()=>{

        let fireTimeout = setTimeout(()=>{

            setTop(-20);

        }, 10);

        let afterLeavingScreenTimeout = setTimeout(()=>{
            
            setScreenLeaveFlag(true);

        }, config.trajectorySpeed);

        return function(){
            clearTimeout(fireTimeout);
        
            clearTimeout(afterLeavingScreenTimeout);
        };

    }, []);

    return {top, screenLeaveFlag};

}