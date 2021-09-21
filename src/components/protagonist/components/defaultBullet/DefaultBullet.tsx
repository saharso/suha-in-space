import React, {useEffect, useContext} from 'react';
import useBulletFireCoordinates from '../../hooks/useBulletFireCoordinates';
import useFiringRate from '../../hooks/useFiringRate';
import ICoordinates from '../../models/iCoordinates';
import ProtagonistContext from '../../models/protagonistContext';
import './DefaultBullet.scss';

export type IDefaultBulletsProps = {
    coordinates: ICoordinates;
}

type IDefaultBulletProps = {
    coordinates: ICoordinates;
    onLeaveScreen: Function;
}

const SingleDefaultBullet: React.FunctionComponent<IDefaultBulletProps> = ({coordinates, onLeaveScreen}) => {

    const config = useContext(ProtagonistContext);

    const firingRate = useBulletFireCoordinates(coordinates);

    useEffect(()=>{
        firingRate.screenLeaveFlag && onLeaveScreen();
    }, [firingRate.screenLeaveFlag]);

    return <div
        style={{
            top: `${firingRate.top}px`,
            left: `${coordinates.protagonistCenter}px`,
            transition: `top ${config.trajectorySpeed}ms ease-out`,
        }}
        className="sis-singleDefaultBullet"/>;

};

const DefaultBullets: React.FunctionComponent<IDefaultBulletsProps> = ({coordinates}) => {

    const firingRate = useFiringRate(); 

    return <div className="sis-defaultBullets">
        {firingRate.bullets.map((item, index) => {
            return <SingleDefaultBullet 
                onLeaveScreen={()=>{
                    firingRate.remove(index);
                }}
                key={index} 
                coordinates={coordinates} 
            />;
        })}
    </div>;
};

export default DefaultBullets;