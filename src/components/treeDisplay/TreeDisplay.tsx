
import React from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import Tree from '../../models/tree';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type ITreeDisplayProps = {
    onTreeUpdate?: (tree: Tree) => void;
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({onTreeUpdate}) => {

    return <section className="b-tree">

    </section>
}

export default TreeDisplay;