import React, {useEffect, useRef} from 'react';
import ConstantsEnum from '../../global/consts/constants.enum';
import './Protagonist.scss';
import useProtagonistCoordinates from './hooks/useProtagonistCoordinates';
import DefaultBullets from './components/defaultBullet/DefaultBullet';
import ProtagonistContext from './models/protagonistContext';
import {ProtagonistConfig} from '../../models/config';

type IProtagonistProps = {
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
            <div id={ConstantsEnum.PROTAGONIST_WRAPPER} className="sis-protagonistWrapper" ref={protagonistWrapperRef}>
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
                />
            </div>
        </ProtagonistContext.Provider>

    </>;
};

export default Protagonist;