
import React, {useState, /*useContext, */useEffect} from 'react';
import useTree from '../../hooks/useTree';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type ITreeDisplayProps = {
    
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = () => {
    const tree = useTree();
    // const children = [];
    const [root, setRoot] = useState<any>(new Node())
    const [foo, setFoo] = useState('');
    useEffect(()=>{
        setRoot(tree.tree.root)
    }, [tree])
    return <>
        <ChildrenDisplay node={root} />
    </>
}

export default TreeDisplay;