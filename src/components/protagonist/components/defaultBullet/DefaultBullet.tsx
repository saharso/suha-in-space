import React, {useEffect, useState, useContext} from 'react';
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

    const firingRage = useBulletFireCoordinates(coordinates);

    useEffect(()=>{
        firingRage.screenLeaveFlag && onLeaveScreen();
    }, [firingRage.screenLeaveFlag]);

    return <div 
        style={{
            top: `${firingRage.top}px`,
            left: `${coordinates.protagonistCenter}px`,
            transition: `top ${config.trajectorySpeed}ms ease-out`,
        }}
        className="sis-singleDefaultBullet"></div>;

};

const DefaultBullets: React.FunctionComponent<IDefaultBulletsProps> = ({coordinates}) => {

    const firingRate = useFiringRate(); 

    return <div className="sis-defaultBullets">
        {firingRate.bullets.map((item, index) => {
            return <SingleDefaultBullet 
                onLeaveScreen={()=>{
                    firingRate.setBullets(prev => {prev = prev.splice(index, 1); return [...prev];});
                }}
                key={index} 
                coordinates={coordinates} 
            />;
        })}
    </div>;
};

export default DefaultBullets;