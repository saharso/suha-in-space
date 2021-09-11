
import React from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import AddItem from '../ui/addItem/addItem';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type INodeDisplayProps = {
    node: Node;
    onChange?: (p: NodeSelection) => void;
    requestNodeGrowth?: (p: Node, value: string) => void;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onChange, requestNodeGrowth}) => {
    
    return <>
        <li id={node.id}>
            <label>
                <input type="checkbox"
                    defaultChecked={node.data.selected}
                    onChange={(e)=>{
                        const selected = e.target.checked;
                        onChange && onChange({selected, node});
                    }}
                />
                {node.id}
            </label>
            <ChildrenDisplay 
                node={node} 
                onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                    onChange && onChange(nodeSelection);
                }}
                requestNodeGrowth={(node, value)=>{requestNodeGrowth && requestNodeGrowth(node, value);}}
            />
            <AddItem
                onAddItem={(nodeValue)=>{requestNodeGrowth && requestNodeGrowth(node, nodeValue)}}
            />            
        </li>
    </>
}

export default NodeDisplay;