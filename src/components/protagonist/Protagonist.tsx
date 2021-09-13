import React, {useEffect, useRef, useState} from 'react';
import ConstantsEnum from '../../models/enum.constants';
import './Protagonist.scss';
import useProtagonistCoordinates from './hooks/useProtagonistCoordinates';
import DefaultBullets from './components/defaultBullet/DefaultBullet';

export type IProtagonistProps = {
    arena: HTMLElement;
}

const Protagonist: React.FunctionComponent<IProtagonistProps> = ({arena}) => {

    const protagonistRef = useRef(null);

    const coordinates = useProtagonistCoordinates(protagonistRef);


    return <>

        <DefaultBullets
            coordinates={coordinates}
        />
        
        <div 
            ref={protagonistRef}
            id={ConstantsEnum.PROTAGONIST_ID} 
            className="sis-protagonist"
            style={{
                top: `${coordinates.top}px`,
                left: `${coordinates.left}px`,
            }}
        ></div>

    </>;
};

export default Protagonist;