import ConstantsEnum from '../consts/constants.enum';

export default class ElementsUtil {

    static getProtagonist(){
        return document.getElementById(ConstantsEnum.PROTAGONIST_ID);
    }

    static isElementsOverlap(el1: HTMLElement, el2: HTMLElement): boolean {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const overlap = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
        return overlap;
    }

    static getRandomScreenXAxisPoint() {
        return Math.random() * window.innerWidth;
    }

    static isElementLeaving(el: HTMLElement) {
        return el.classList.contains('is-leaving');
    }

    static removeElement(el, delayMs?: number) {
        if(!el) return;
        if(el.classList.contains('is-leaving')) return;

        el.classList.add('is-leaving');

        const remove = ()=>{
            el.parentNode?.removeChild(el);
            el = null;
        };

        delayMs ? setTimeout(remove, delayMs) : remove();

    }

    static observe(watch: HTMLElement, relativeTo: NodeList, callback: Function ){

        const config = { attributes: true, childList: true, subtree: true };

        const onMutation = (mutationsList) => {

            for(const mutation of mutationsList) {

                if (mutation.type === 'attributes') {
                    relativeTo && Array.from(relativeTo).forEach((el: HTMLElement) => {
                        callback(mutation, el);
                    });

                } else break;
            }
        };

        const observer = new MutationObserver(onMutation);

        observer.observe(watch, config);

        return observer;
    }

}