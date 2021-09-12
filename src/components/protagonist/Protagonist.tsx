import React, {useEffect} from 'react';
import ConstantsEnum from '../../models/enum.constants';
import './Protagonist.scss';

export type IProtagonistProps = {
    arena: HTMLElement;
}

const Protagonist: React.FunctionComponent<IProtagonistProps> = ({arena}) => {

    useEffect(()=>{
        if(!arena) return;
        console.log(arena);
    }, [arena]);


    return <div id={ConstantsEnum.PROTAGONIST_ID} className="sis-protagonist"></div>;
};

export default Protagonist;