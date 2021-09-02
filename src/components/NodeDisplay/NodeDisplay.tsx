
import React, {/*useState, useContext, */useEffect} from 'react';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';

export type INodeDisplayProps = {
    node: Node;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node}) => {


    return <>
        <li id={node.id}>
            <input type="checkbox"/>
            {node.id}
            <ul>
                <ChildrenDisplay node={node} />
            </ul>
        </li>

    </>
}

export default NodeDisplay;