import React, {useEffect, useState} from 'react';
import Tree from '../models/tree';

let _tree: Tree;

export function initTree(tree: Tree): void {
    _tree = tree;
    console.log('yo')
}
function useTree(tree: Tree): any {
    const [treeState, setTree] = useState<Tree>();
    useEffect(()=>{
        setTree(tree);
    },[tree])
    return {treeState};
}

export default useTree;