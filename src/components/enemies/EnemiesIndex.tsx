import React from 'react';
import PoopyShmoopy from './PoopyShmoopy/PoopyShmoopy';


type TEnemiesIndexProps = {
    config: any;
    protagonistEl: HTMLElement;
};

const EnemiesIndex: React.FunctionComponent<TEnemiesIndexProps> = ({config, protagonistEl}) => {

    console.log(config);
    return <>
        <PoopyShmoopy
            config={config.enemies.poopyShmoopy}
            onHit={(e)=>{console.log(e);}}
        />

    </>;
};

export default EnemiesIndex;