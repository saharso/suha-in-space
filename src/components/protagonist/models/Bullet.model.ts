import BulletConfig from './BulletConfig.model';
import intervalWorker from '../../../global/workers/intervalWorker';

export default class BulletModel extends BulletConfig {
    private bulletModel = document.createElement('div');
    public interval;
    private intervalWorker;
    constructor(config?: Partial<BulletConfig>) {
        super(config);
        this.initIntervalWorker();
        this.buildBulletModel();
    }

    private buildBulletModel () {
        this.bulletModel.className = 'sis-singleDefaultBullet';
    }

    private initIntervalWorker(){
        if(!this.generationRate) return;
        this.intervalWorker = new Worker(intervalWorker);
        this.intervalWorker.postMessage(this.generationRate);
    }


    private generateBullet () {
        let newBullet: HTMLElement = this.bulletModel.cloneNode(true) as HTMLElement;

        const defineBulletInitialStyle = () => {
            newBullet.style.top = this.coordinates.top + 'px';
            newBullet.style.left = this.coordinates.protagonistCenter - (newBullet.offsetWidth / 2) + 'px';
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

        const clearBullet = () => {
            setTimeout(()=>{
                newBullet.parentNode?.removeChild(newBullet);
                newBullet = null;
            }, this.speed);
        };

        const moveBulletUpwards = () => {
            newBullet && requestAnimationFrame(()=>{
                if(!newBullet) return;
                newBullet.style.top = `-${newBullet.offsetHeight}px`;
            });
        };

        defineBulletInitialStyle();
        appendBulletToParent();
        updateBulletAttribute();
        moveBulletUpwards();
        clearBullet();
    }

    public shoot(){
        this.intervalWorker.onmessage = ()=>{this.generateBullet();};
    }

}
