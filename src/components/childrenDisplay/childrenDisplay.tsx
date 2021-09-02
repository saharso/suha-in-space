
import React, {useState, /*useContext, */useEffect} from 'react';
import useTree from '../../hooks/useTree';
import Node from '../../models/node';
import Children from '../../models/children';
import NodeDisplay from '../NodeDisplay/NodeDisplay';

export type IChildrenProps = {
    node: Node;
}

const TreeDisplay: React.FunctionComponent<IChildrenProps> = ({node}) => {
    return <>
        <ul id={`childrenDisplayOfNode_${node.id}`}>
            {Children.toArray(node.children).map((child)=>(
                <NodeDisplay node={child} key={child.id} />
            ))}
        </ul>
    </>
}

export default TreeDisplay;