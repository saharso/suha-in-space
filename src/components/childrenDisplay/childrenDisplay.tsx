
import React, { useEffect, useState } from 'react';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';
import NodeMap from '../../models/type/nodeMap';
import NodeSelection from '../../models/interface/nodeSelection';

export type IChildrenProps = {
    node: Node;
    onNodeSelectionEdit?: (nodeMap: NodeMap) => void;
}

const updateSelectedNodes = (prev, selected) => {
    const map = new Map(prev);
    if(selected.selected){
        map.set(selected.node.id, selected.node);
    } else {
        map.delete(selected.node.id)
    }
    return map;
}

const ChildrenDisplay: React.FunctionComponent<IChildrenProps> = ({node, onNodeSelectionEdit}) => {
    const [selected, setSelected] = useState<NodeSelection>(null);
    const [selectedNodesList, setSelectedNodesList] = useState<any>(null);
    
    useEffect(() => {
        selected && setSelectedNodesList(prev => updateSelectedNodes(prev, selected));
    }, [selected]);

    useEffect(() => {
        selectedNodesList && console.log(Array.from(selectedNodesList.values()));
    }, [selectedNodesList]);

    // kill em all
    useEffect(() => {
        return () => {
            setSelected(null);
            setSelectedNodesList(null);
        }
    }, []);
    
    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay 
                    node={child}
                    key={child.id}
                    onChange={(nodeSelection: NodeSelection) => {
                        setSelected(nodeSelection);
                    }}
                />
            ))}
        </ul>
    </>
}

export default ChildrenDisplay;