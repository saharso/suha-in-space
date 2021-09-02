import {useEffect, useState, useReducer} from 'react';
import Tree from '../models/tree';
import reducer from '../models/reducer';
import store from '../models/store';

function useTree(): any {
    const [state/*, dispatch*/] = useReducer(reducer, store);
    const [tree, setTree] = useState<Tree>(new Tree());
    useEffect(()=>{
        setTree(state.tree);
        console.log('useTree')
    }, [state])
    return {tree};
}

export default useTree;