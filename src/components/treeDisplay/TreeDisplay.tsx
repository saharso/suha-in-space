import React from 'react';
import NodeSelection from './models/interface/nodeSelection';
import Tree from './models/tree';
import ChildrenDisplay from './components/childrenDisplay/childrenDisplay';
import Node from './models/node';

export type ITreeDisplayProps = {
    onNodeSelectionEdit?: (nodeSelection: NodeSelection) => void;
    tree: Tree;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({tree, onNodeSelectionEdit}) => {
    return <section className="b-tree">
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                onNodeSelectionEdit && onNodeSelectionEdit(nodeSelection);
            }}
            requestNodeGrowth={(node)=>{console.log(node)}}
        />
    </section>
}

export default TreeDisplay;