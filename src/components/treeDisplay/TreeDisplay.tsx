import React, { useEffect } from 'react';
import NodeSelection from './models/interface/nodeSelection';
import Tree from './models/tree';
import ChildrenDisplay from './components/childrenDisplay/childrenDisplay';
import useTree from './hooks/useTree';

export type ITreeDisplayProps = {
    onNodeSelectionEdit?: (nodeSelection: NodeSelection) => void;
    tree: Tree;
    onTreeUpdate?: Function;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({tree, onNodeSelectionEdit, onTreeUpdate}) => {
    const treeApi = useTree(tree);
    
    useEffect(()=>{
        onTreeUpdate(treeApi.tree);
    },[treeApi.tree, onTreeUpdate]);

    return <section className="b-tree">
        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                onNodeSelectionEdit && onNodeSelectionEdit(nodeSelection);
            }}
            onRequestNodeGrowth={(node, value)=>{treeApi.actions.grow(node, value)}}
            onRequestNodeRemove={(node)=>{console.log(node)}}
        />
    </section>
}

export default TreeDisplay;