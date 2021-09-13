import React, {useEffect, useState} from 'react';
import ICoordinates from '../../models/iCoordinates';
import './DefaultBullet.scss';

export type IDefaultBulletsProps = {
    coordinates: ICoordinates;
}

type IDefaultBulletProps = {
    coordinates: ICoordinates;
    onLeaveScreen: Function;
}

const trajectorySpeed = 500;

const SingleDefaultBullet: React.FunctionComponent<IDefaultBulletProps> = ({coordinates, onLeaveScreen}) => {

    const [top, setTop] = useState(coordinates.top);

    useEffect(()=>{
        let fireTimeout = setTimeout(()=>{
            setTop(-20);
        }, 10);

        let afterLeavingScreenTimeout = setTimeout(()=>{
            onLeaveScreen();
        }, trajectorySpeed);

        return function(){
            clearTimeout(fireTimeout);
            clearTimeout(afterLeavingScreenTimeout);
        };
    }, []);

    return <div 
        style={{
            top: `${top}px`,
            left: `${coordinates.left}px`,
            transition: `top ${trajectorySpeed}ms ease-out`,
        }}
        className="sis-singleDefaultBullet"></div>;
};
const DefaultBullets: React.FunctionComponent<IDefaultBulletsProps> = ({coordinates}) => {

    const [bullets, setBullets] = useState([]);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setBullets(prev => {prev.push(null); return [...prev];});
        }, 100);

        return function(){
            clearInterval(interval);
        };
    }, []);

    return <div className="sis-defaultBullets">
        {bullets.map((item, index) => {
            return <SingleDefaultBullet 
                onLeaveScreen={()=>{
                    setBullets(prev => {prev = prev.splice(index, 1); return [...prev];});
                }}
                key={index} 
                coordinates={coordinates} 
            />;
        })}
    </div>;
};

export default DefaultBullets;