import React, {useEffect, useContext, useRef} from 'react';
import useBulletFireCoordinates from '../../hooks/useBulletFireCoordinates';
import useFiringManager from '../../hooks/useFiringManager';
import ICoordinates from '../../models/iCoordinates';
import ProtagonistContext from '../../models/protagonistContext';
import './DefaultBullet.scss';

export type IDefaultBulletsProps = {
    coordinates: ICoordinates;
}

const DefaultBullets: React.FunctionComponent<IDefaultBulletsProps> = ({coordinates}) => {

    const parentRef = useRef(null);

    const firingRate = useFiringManager(parentRef, coordinates);

    return <div ref={parentRef} className="sis-defaultBullets"/>;
};

export default DefaultBullets;