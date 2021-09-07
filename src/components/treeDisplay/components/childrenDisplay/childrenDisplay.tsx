
import React from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeSelection from '../../models/interface/nodeSelection';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (selectedNodes: NodeSelection) => void;
}



const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit}) => {

    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onChange={(nodeSelection: NodeSelection) => {
                        onNodeSelectionEdit(nodeSelection);
                    }}
                />
            ))}
        </ul>
    </>
}

export default ChildrenDisplay;