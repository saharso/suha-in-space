
import React from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeSelection from '../../models/interface/nodeSelection';
import AddItem from '../addItem/addItem';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (selectedNodes: NodeSelection) => void;
    requestNodeGrowth?: (p: Node, value: string) => void;
}

const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit, requestNodeGrowth}) => {
    if(!node.children?.size()) return null;
    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onChange={(nodeSelection: NodeSelection) => {
                        onNodeSelectionEdit(nodeSelection);
                    }}
                    requestNodeGrowth={(node, nodeValue)=>{requestNodeGrowth && requestNodeGrowth(node, nodeValue)}}
                />
            ))}
        </ul>
        <AddItem
            onAddItem={(nodeValue)=>{requestNodeGrowth && requestNodeGrowth(node, nodeValue)}}
        />
    </>
}

export default ChildrenDisplay;