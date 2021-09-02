
import React, {useState, useContext, useEffect} from 'react';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import { AppContext } from '../../models/appContext';
import NodeMap from '../../models/type/nodeMap';

export interface ITreeDisplayProps {
    onNodeSelectionEdit?: (nodeSelection: NodeMap) => void
}

const TreeDisplay: React.FunctionComponent<ITreeDisplayProps> = ({onNodeSelectionEdit}) => {
    const { state } = useContext(AppContext);
    const [root, setRoot] = useState<any>(new Node())
    useEffect(()=>{
        setRoot(state.tree.root)
    }, [state])
    return <>
        <ChildrenDisplay 
            node={root}
            onNodeSelectionEdit={(e: NodeMap) =>{
                onNodeSelectionEdit && onNodeSelectionEdit(e);
            }}
         />
    </>
}

export default TreeDisplay;