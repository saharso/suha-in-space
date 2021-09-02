
import React, {useState, /*useContext, */useEffect} from 'react';
import useTree from '../../hooks/useTree';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type ITreeDisplayProps = {
    
}
let count = 0;
const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = () => {
    const tree = useTree();
    const [root, setRoot] = useState<any>(new Node())
    useEffect(()=>{
        console.log(tree);
        setRoot(tree.tree.root)
    }, [tree])
    return <>
        <ChildrenDisplay node={root} />
    </>
}

export default TreeDisplay;