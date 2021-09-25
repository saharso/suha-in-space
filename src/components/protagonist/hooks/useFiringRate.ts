import React, {useState, useEffect, useContext, useCallback} from 'react';
import BulletConfig from '../models/BulletConfig.model';
import BulletModel from '../models/Bullet.model';



const config = new BulletConfig({
    generationRate: 500,
    speed: 1500,
});

export default function useFiringRate(parentRef, coordinates) {
    
    const [bulletModel, setBulletModel] = useState(null);

    const [bullets, setBullets] = useState([]);
    
    const remove = useCallback((index)=>{
        setBullets(prev => {prev = prev.splice(index, 1); return [...prev];});
    }, []);

    useEffect(()=> {
        setBulletModel(new BulletModel(config));
    }, []);

    useEffect(()=>{
        if(!coordinates || !bulletModel) return;

        bulletModel.set({coordinates});

    }, [coordinates, bulletModel]);

    useEffect(()=>{
        
        if(!bulletModel) return;

        bulletModel.set({parentEl: parentRef.current}).shoot();

        return function(){
            clearInterval(bulletModel.interval);
        };
        
    }, [bulletModel]);

    return {bullets, remove};
}