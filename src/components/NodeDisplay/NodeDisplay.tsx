
import React from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type INodeDisplayProps = {
    node: Node;
    onChange?: (p: NodeSelection) => void;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onChange}) => {

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
            <ul>
                <ChildrenDisplay 
                    node={node} 
                    onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
                        onChange && onChange(nodeSelection);
                    }}
                />
            </ul>
        </li>
    </>
}

export default NodeDisplay;