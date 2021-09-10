import React from 'react';
import NodeSelection from './models/interface/nodeSelection';
import Tree from './models/tree';
import ChildrenDisplay from './components/childrenDisplay/childrenDisplay';

export type ITreeDisplayProps = {
    onNodeSelectionEdit?: (nodeSelection: NodeSelection) => void;
    tree: Tree;
    requestNodeGrowth?: Function;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({tree, onNodeSelectionEdit, requestNodeGrowth}) => {

    return <section className="b-tree">
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                onNodeSelectionEdit && onNodeSelectionEdit(nodeSelection);
            }}
            requestNodeGrowth={(node, value)=>{requestNodeGrowth(node, value)}}
        />
    </section>
}

export default TreeDisplay;