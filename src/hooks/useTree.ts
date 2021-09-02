import {useEffect, useState, useReducer} from 'react';
import Tree from '../models/tree';
import reducer from '../models/reducer';
import store from '../models/store';

function useTree(): any {
    const [state/*, dispatch*/] = useReducer(reducer, store);
    const [treeState, setTree] = useState<Tree>();
    useEffect(()=>{
        setTree(state.tree);
    },[state])
    return {treeState};
}

export default useTree;