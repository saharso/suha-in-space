
import React from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeSelection from '../../models/interface/nodeSelection';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (selectedNodes: NodeSelection) => void;
    onRequestNodeGrowth?: (p: Node, value: string) => void;
    onRequestNodeRemove?: (node: Node) => void;
}

const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit, onRequestNodeGrowth, onRequestNodeRemove}) => {
    if(!node.children?.size()) return null;
    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onNodeSelectionEdit={(nodeSelection: NodeSelection) => {
                        onNodeSelectionEdit(nodeSelection);
                    }}
                    onRequestNodeGrowth={(node, nodeValue)=>{
                        onRequestNodeGrowth && onRequestNodeGrowth(node, nodeValue)
                    }}
                    onRequestNodeRemove={(node)=>{
                        onRequestNodeRemove && onRequestNodeRemove(node)
                    }}
                />
            ))}
        </ul>
    </>
}

export default ChildrenDisplay;