
import React from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import AddItem from '../ui/addItem/addItem';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type INodeDisplayProps = {
    node: Node;
    onChange?: (nodeSelection: NodeSelection) => void;
    onRequestNodeGrowth?: (node: Node, value: string) => void;
    onRequestNodeRemove?: (node: Node) => void;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onChange, onRequestNodeGrowth, onRequestNodeRemove}) => {
    
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
            <button 
                className="b-tree__removeItem"
                onClick={()=>{onRequestNodeRemove(node)}}
            >X</button>
            <ChildrenDisplay 
                node={node} 
                onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                    onChange && onChange(nodeSelection);
                }}
                onRequestNodeGrowth={(node, value)=>{onRequestNodeGrowth && onRequestNodeGrowth(node, value);}}
            />
            <AddItem
                onAddItem={(nodeValue)=>{onRequestNodeGrowth && onRequestNodeGrowth(node, nodeValue)}}
            />            
        </li>
    </>
}

export default NodeDisplay;