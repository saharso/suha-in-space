
import React, { useEffect, useState } from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeMap from '../../models/type/nodeMap';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (nodeMap: NodeMap) => void;
}

function updateSelectionMap(prev: NodeMap, nodeSelection){
    const map = new Map([...prev]);
    if(nodeSelection.selected) {
        map.set(nodeSelection.node.id, nodeSelection.node);
    } else {
        map.delete(nodeSelection.node.id);
    }
    return map;    
}

const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit}) => {
    const [selected, setSelected] = useState<NodeMap>(new Map());
    
    useEffect(()=>{
        onNodeSelectionEdit && onNodeSelectionEdit(selected);
    }, [selected, onNodeSelectionEdit])
    
    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onChange={(nodeSelection) => {
                        setSelected((prev) => updateSelectionMap(prev, nodeSelection));
                    }}
                />
            ))}
        </ul>
    </>
}

export default ChildrenDisplay;