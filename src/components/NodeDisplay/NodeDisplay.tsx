
import React, {/*useState, useContext, */useEffect} from 'react';
import Node from '../../models/node';


export type INodeDisplayProps = {
    node: Node;
}

const NodeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node}) => {


    return <>
        <li id={node.id}>
            {node.data}
            <ul>

            </ul>
        </li>

    </>
}

export default NodeDisplay;