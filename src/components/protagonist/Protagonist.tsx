import React, {useEffect, useRef, useState} from 'react';
import ConstantsEnum from '../../models/enum.constants';
import './Protagonist.scss';
import useProtagonistCoordinates from './hooks/useProtagonistCoordinates';
import DefaultBullets from './components/defaultBullet/DefaultBullet';
import ProtagonistContext from './models/protagonistContext';
import {ProtagonistConfig} from '../../models/config';

export type IProtagonistProps = {
    onProtagonistLoad?: (e: HTMLDivElement) => void;
    config: ProtagonistConfig;
}

const Protagonist: React.FunctionComponent<IProtagonistProps> = ({onProtagonistLoad, config}) => {

    const protagonistRef = useRef(null);

    const protagonistWrapperRef = useRef(null);

    const coordinates = useProtagonistCoordinates(protagonistRef);

    useEffect(()=>{
        onProtagonistLoad && onProtagonistLoad(protagonistWrapperRef.current);
    }, []);

    return <>
        <ProtagonistContext.Provider value={config}>
            <div className="sis-protagonistWrapper" ref={protagonistWrapperRef}>
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
            </div>
        </ProtagonistContext.Provider>

    </>;
};

export default Protagonist;