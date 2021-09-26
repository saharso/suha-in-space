import BulletConfig from './BulletConfig.model';

export default class BulletModel extends BulletConfig {
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
                this.parentEl.removeChild(newBullet);
                newBullet = null;
            }, this.speed);
        };

        const moveBulletUpwards = () => {
            newBullet && requestAnimationFrame(()=>{
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
        this.interval = setInterval(()=>{
            this.generateBullet();
        }, this.generationRate);
    }

}
