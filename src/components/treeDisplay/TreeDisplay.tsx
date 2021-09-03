
import React from 'react';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import NodeMap from '../../models/type/nodeMap';
import Tree from '../../models/tree';
import Node from '../../models/node';

export interface ITreeDisplayProps {
    onNodeSelectionEdit?: (nodeSelection: Node[]) => void;
    tree: Tree;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({onNodeSelectionEdit, tree}) => {
    
    return <>
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeMap: Node[]) => {
                nodeMap && onNodeSelectionEdit && onNodeSelectionEdit(nodeMap);
            }}
         />
    </>
}

export default TreeDisplay;