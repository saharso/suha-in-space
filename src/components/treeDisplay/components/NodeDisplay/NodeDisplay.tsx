
import React, {useEffect, useRef} from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import AddItem from '../ui/addItem/addItem';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import useIntermediateCheckbox from '../../hooks/useIntermediateCheckbox';
import useCheckAll from '../../hooks/useCheckAll';

export type INodeDisplayProps = {
    node: Node;
    onNodeSelectionEdit?: (nodeSelection: NodeSelection) => void;
    onRequestNodeGrowth?: (node: Node, value: string) => void;
    onRequestNodeRemove?: (node: Node) => void;
}


const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onNodeSelectionEdit, onRequestNodeGrowth, onRequestNodeRemove}) => {
    const checkbox = useRef(null);

    const setIntermediate = useIntermediateCheckbox(checkbox);
    const checkAll = useCheckAll(node, checkbox);

    return <>
        <li id={node.id}>
            <label>
                <input type="checkbox"
                    defaultChecked={node.data.selected}
                    ref={checkbox}
                    onChange={(e)=>{
                        const selected = e.target.checked;
                        onNodeSelectionEdit && onNodeSelectionEdit({selected, node});
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
                    onNodeSelectionEdit && onNodeSelectionEdit(nodeSelection);
                    checkAll(nodeSelection);
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