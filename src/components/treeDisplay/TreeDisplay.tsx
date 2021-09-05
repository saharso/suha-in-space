
import React from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import Tree from '../../models/tree';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type ITreeDisplayProps = {
    onTreeUpdate?: (tree: Tree) => void;
    onNodeSelectionEdit?: (nodeSelection: NodeSelection) => void;
    tree: Tree;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({tree, onTreeUpdate, onNodeSelectionEdit}) => {

    return <section className="b-tree">
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                onNodeSelectionEdit && onNodeSelectionEdit(nodeSelection);
            }}
        />
    </section>
}

export default TreeDisplay;