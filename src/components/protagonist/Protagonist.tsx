import React, {useEffect, useRef, useState} from 'react';
import ConstantsEnum from '../../models/enum.constants';
import './Protagonist.scss';

export type IProtagonistProps = {
    arena: HTMLElement;
}



const Protagonist: React.FunctionComponent<IProtagonistProps> = ({arena}) => {

    const protagonistRef = useRef(null);

    const [left, setLeft] = useState<number>(0);
    const [top, setTop] = useState<number>(0);

    function onMouseMove(e: MouseEvent) {
        if(!protagonistRef.current) return;
        const protagonistWidth = protagonistRef.current.clientWidth;
        const protagonistHeight = protagonistRef.current.clientWidth;   
        const x = e.clientX - protagonistWidth / 2;
        const y = e.clientY - protagonistHeight / 2;
        setLeft(x);
        setTop(y);
    }

    useEffect(()=>{
        if(!arena) return;
        window.addEventListener('mousemove', onMouseMove);
        return function(){
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [arena]);


    return <div 
        ref={protagonistRef}
        id={ConstantsEnum.PROTAGONIST_ID} 
        className="sis-protagonist"
        style={{
            top: `${top}px`,
            left: `${left}px`,
        }}
    ></div>;
};

export default Protagonist;