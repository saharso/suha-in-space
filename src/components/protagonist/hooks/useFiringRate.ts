import React, {useState, useEffect, useContext, useCallback} from 'react';
import ProtagonistContext from '../models/protagonistContext';
import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';

class BulletConfig {
    speed: number = 200;
    generationRate: number = 500;
    constructor (config?: Partial<BulletConfig>){
        overrideClassPropsTool.call(this, config);
    }
}

class BulletModel extends BulletConfig {
    private bulletModel = document.createElement('div');
    constructor(config?: Partial<BulletConfig>) {
        super(config);
        this.buildBulletModel();
    }

    private buildBulletModel () {
        this.bulletModel.className = 'sis-singleDefaultBullet';
    }

}

const config = new BulletConfig({
    generationRate: 500,
});

console.log(config);

export default function useFiringRate(parentRef, coordinates) {
    
    const [bulletModel, setBulletModel] = useState(null);

    const [bullets, setBullets] = useState([]);
    
    const remove = useCallback((index)=>{
        setBullets(prev => {prev = prev.splice(index, 1); return [...prev];});
    }, []);

    useEffect(()=>{
        console.log(coordinates);
    }, [coordinates]);

    useEffect(()=>{

        setBulletModel(new BulletModel(config));

        const interval = setInterval(()=>{
            setBullets(prev => {prev.push(null); return [...prev];});
        }, config.generationRate);

        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {bullets, remove};
}