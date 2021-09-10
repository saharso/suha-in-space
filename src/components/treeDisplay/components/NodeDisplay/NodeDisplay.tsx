
import React, {useState, useEffect} from 'react';
import NodeSelection from '../../models/interface/nodeSelection';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type INodeDisplayProps = {
    node: Node;
    onChange?: (p: NodeSelection) => void;
    requestNodeGrowth?: (p: Node, value: string) => void;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node, onChange, requestNodeGrowth}) => {
    const [value, setValue] = useState('');
    useEffect(()=>{
        requestNodeGrowth && requestNodeGrowth(node, value);
    }, [value, requestNodeGrowth, node])
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
                requestNodeGrowth={(node, value)=>{setValue(value);}}
            />
        </li>
    </>
}

export default NodeDisplay;