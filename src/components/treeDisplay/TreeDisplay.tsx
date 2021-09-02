
import React, {/*useState, useContext, */useEffect} from 'react';
import useTree from '../../hooks/useTree';

export type ITreeDisplayProps = {
    
}
const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = () => {
    const tree = useTree();

    useEffect(()=>{
        console.log(tree);
    }, [tree])
    return <>
        hayush
    </>
}

export default TreeDisplay;