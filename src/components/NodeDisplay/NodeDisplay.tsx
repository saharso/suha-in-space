
import React, {/*useState, useContext, */useEffect} from 'react';
import Node, {Children} from '../../models/node';

export type INodeDisplayProps = {
    node: Node;
}
function mapToArray(children: Children) {
    return Object.values(children);
}
const TreeDisplay: React.FunctionComponent<INodeDisplayProps> = ({node}) => {
    const childList = mapToArray(node.children);
    console.log(childList);
    return <>
        <li id={node.id}>
            {node.data}
            <ul>

            </ul>
        </li>

    </>
}

export default TreeDisplay;