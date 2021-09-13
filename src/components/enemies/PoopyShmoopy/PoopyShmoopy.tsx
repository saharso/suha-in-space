import React, {useEffect} from 'react';

type IPoopyShmoopyProps = {
    protagonistEl: HTMLElement;
}

const PoopyShmoopy: React.FunctionComponent<IPoopyShmoopyProps> = ({protagonistEl}) => {

    useEffect(()=>{
        if(!protagonistEl) return;
        console.log(protagonistEl);
    }, [protagonistEl]);

    return <div className="sis-enemy sis-enemy--poopyShmoopy"></div>;
};

export default PoopyShmoopy;