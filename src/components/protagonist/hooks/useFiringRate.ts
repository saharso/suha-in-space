import React, {useState, useEffect, useContext, useCallback} from 'react';
import overrideClassPropsTool from '../../../global/tools/overrideClassProps.tool';

class BulletConfig {
    speed: number = 300;
    generationRate: number = 40;
    parentEl: HTMLElement;
    coordinates;
    constructor (config?: Partial<BulletConfig>){
        this.set(config);
    }
    set(config?: Partial<BulletConfig>){
        overrideClassPropsTool.call(this, config);
        return this;
    }
}

class BulletModel extends BulletConfig {
    private bulletModel = document.createElement('div');
    public interval;
    constructor(config?: Partial<BulletConfig>) {
        super(config);
        this.buildBulletModel();
    }

    private buildBulletModel () {
        this.bulletModel.className = 'sis-singleDefaultBullet';
    }

    private generateBullet () {
        let newBullet: HTMLElement = this.bulletModel.cloneNode(true) as HTMLElement;

        const defineBulletInitialStyle = () => {
            newBullet.style.top = this.coordinates.top + 'px';
            newBullet.style.left = this.coordinates.left + 'px';
            newBullet.style.transition = `top ${this.speed}ms linear`;
        };

        const appendBulletToParent = () => {
            this.parentEl.appendChild(newBullet);
        };

        const updateBulletAttribute = () => {
            newBullet.setAttribute('data-top', '' + newBullet.getBoundingClientRect().top);

            requestAnimationFrame(()=>{
                if(newBullet) updateBulletAttribute();
            });
        };

        const clearBulletAfter = (msDelay: number) => {
            setTimeout(()=>{
                this.parentEl.removeChild(newBullet);
                newBullet = null;
            }, msDelay);
        };

        const moveBulletUpwards = () => {
            requestAnimationFrame(()=>{
                newBullet.style.top = `-${newBullet.offsetHeight}px`;
            });
        };

        defineBulletInitialStyle();
        appendBulletToParent();
        updateBulletAttribute();
        moveBulletUpwards();
        clearBulletAfter(this.speed);
    }

    public shoot(){
        console.log(this.parentEl);
        this.interval = setInterval(()=>{
            this.generateBullet();
        }, this.generationRate);
    }

}

const config = new BulletConfig({
    // generationRate: 500,
});

console.log(config);

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