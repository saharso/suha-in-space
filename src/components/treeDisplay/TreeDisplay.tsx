
import React from 'react';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import NodeMap from '../../models/type/nodeMap';
import Tree from '../../models/tree';

export interface ITreeDisplayProps {
    onNodeSelectionEdit?: (nodeSelection: NodeMap) => void;
    tree: Tree;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({onNodeSelectionEdit, tree}) => {
    console.log(tree);
    return <>
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(e: NodeMap) =>{
                onNodeSelectionEdit && onNodeSelectionEdit(e);
            }}
         />
    </>
}

export default TreeDisplay;