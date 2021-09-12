import React, {useEffect, useRef, useState} from 'react';
import ConstantsEnum from '../../models/enum.constants';
import './Protagonist.scss';
import useProtagonistMovement from './hooks/useProtagonistMovement';

export type IProtagonistProps = {
    arena: HTMLElement;
}

const Protagonist: React.FunctionComponent<IProtagonistProps> = ({arena}) => {

    const protagonistRef = useRef(null);

    const coordinates = useProtagonistMovement(protagonistRef);

    return <div 
        ref={protagonistRef}
        id={ConstantsEnum.PROTAGONIST_ID} 
        className="sis-protagonist"
        style={{
            top: `${coordinates.top}px`,
            left: `${coordinates.left}px`,
        }}
    ></div>;
};

export default Protagonist;