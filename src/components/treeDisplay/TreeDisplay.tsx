
import React, {useState, /*useContext, */useEffect} from 'react';
import useTree from '../../hooks/useTree';
import Node, {Children} from '../../models/node';
export type ITreeDisplayProps = {
    
}
function mapToArray(children: Children) {
    console.log(children)
    return Object.values(children);
}
const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = () => {
    const tree = useTree();
    const [children, setChildren] = useState<Node[]>([])
    useEffect(()=>{
        console.log(tree);
        const children = tree.root.children;
        console.log(Object.values(children))
        // tree.treeState?.root?.children && setChildren(mapToArray(tree.treeState?.root?.children));
        console.log(children);
    })
    return <>
        <ul className="tree">

        </ul>
    </>
}

export default TreeDisplay;