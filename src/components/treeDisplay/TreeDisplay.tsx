
import React, {useState, useContext, useEffect} from 'react';
import Node from '../../models/node';
import ChildrenDisplay from '../childrenDisplay/childrenDisplay';
import { AppContext } from '../../models/appContext';

const TreeDisplay: React.FunctionComponent = () => {
    const { state } = useContext(AppContext);
    const [root, setRoot] = useState<any>(new Node())
    useEffect(()=>{
        console.log(state);
        setRoot(state.tree.root)
    }, [state])
    return <>
        <ChildrenDisplay node={root} />
    </>
}

export default TreeDisplay;