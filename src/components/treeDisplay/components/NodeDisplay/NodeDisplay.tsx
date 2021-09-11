
import React, {useRef, useState} from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import AddItem from '../ui/addItem/addItem';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import useIntermediateCheckbox from '../../hooks/useIntermediateCheckbox';

export type INodeDisplayProps = {
    node: Node;
    onChange?: (nodeSelection: NodeSelection) => void;
    onRequestNodeGrowth?: (node: Node, value: string) => void;
    onRequestNodeRemove?: (node: Node) => void;
}


const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onChange, onRequestNodeGrowth, onRequestNodeRemove}) => {
    const checkbox = useRef(null);

    const setIntermediate = useIntermediateCheckbox(checkbox);

    return <>
        <li id={node.id}>
            <label>
                <input type="checkbox"
                    defaultChecked={node.data.selected}
                    ref={checkbox}
                    onChange={(e)=>{
                        const selected = e.target.checked;
                        onChange && onChange({selected, node});
                    }}
                />
                {node.id}
            </label>
            <button 
                className="b-tree__removeItem"
                onClick={()=>{onRequestNodeRemove && onRequestNodeRemove(node)}}
            >X</button>

            <ChildrenDisplay 
                node={node} 
                onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                    onChange && onChange(nodeSelection);
                    setIntermediate(nodeSelection);
                }}
                onRequestNodeGrowth={(node, value)=>{onRequestNodeGrowth && onRequestNodeGrowth(node, value);}}
                onRequestNodeRemove={(node)=>onRequestNodeRemove && onRequestNodeRemove(node)}
            />
            <AddItem
                onAddItem={(nodeValue)=>{onRequestNodeGrowth && onRequestNodeGrowth(node, nodeValue)}}
            />            
        </li>
    </>
}

export default NodeDisplay;