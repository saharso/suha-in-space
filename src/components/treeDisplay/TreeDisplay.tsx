
import React from 'react';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import NodeMap from '../../models/type/nodeMap';
import Tree from '../../models/tree';

export interface ITreeDisplayProps {
    onNodeSelectionEdit?: (nodeSelection: NodeMap) => void;
    tree: Tree;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({onNodeSelectionEdit, tree}) => {
    
    return <>
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(selectedNodes: NodeMap) => {
                selectedNodes && onNodeSelectionEdit && onNodeSelectionEdit(selectedNodes);
            }}
         />
    </>
}

export default TreeDisplay;