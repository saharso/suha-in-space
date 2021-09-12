import {useEffect, useState}  from 'react';
import NodeSelection from '../models/interface/nodeSelection';
import Node from '../models/node';

function useCheckAll(node: Node, checkbox) {
    const [childrenSelected, setChildrenSelected] = useState<Set<string>>(new Set());

    useEffect(()=>{
        if(!node.children) return;

        const checkboxEl = checkbox.current;

        const isChecked = childrenSelected.size === node.children.size();
        console.log(isChecked, 'from useCheckAll');
        
        checkboxEl.checked = isChecked;

    }, [childrenSelected, checkbox, node]);

    return function(nodeSelection?: NodeSelection) {
        if(!node.children[nodeSelection.node.id]) return;

        if(nodeSelection.selected) {
            childrenSelected.add(nodeSelection.node.id);
        } else {
            childrenSelected.delete(nodeSelection.node.id);
        }
        setChildrenSelected(new Set(childrenSelected));
    };

}

export default useCheckAll;