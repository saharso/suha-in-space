
import React from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeSelection from '../../models/interface/nodeSelection';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (selectedNodes: NodeSelection) => void;
    requestNodeGrowth?: (p: Node) => void;
}

const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit, requestNodeGrowth}) => {

    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onChange={(nodeSelection: NodeSelection) => {
                        onNodeSelectionEdit(nodeSelection);
                    }}
                    requestNodeGrowth={(node)=>{requestNodeGrowth && requestNodeGrowth(node)}}
                />
            ))}
        </ul>
        <button
            onClick={()=>{requestNodeGrowth && requestNodeGrowth(node)}}
        >+</button>
    </>
}

export default ChildrenDisplay;