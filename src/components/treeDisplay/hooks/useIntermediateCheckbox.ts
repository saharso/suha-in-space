import {useEffect, useState}  from 'react';
import NodeSelection from '../models/interface/nodeSelection';

function useIntermediateCheckbox(checkbox){

    const [childrenSelected, setChildrenSelected] = useState<Set<string>>(new Set());

    const foo = "foo"
    
    useEffect(()=>{
        requestAnimationFrame(()=>{

            const checkboxEl = checkbox.current;
    
            checkboxEl.indeterminate = !checkboxEl.checked && childrenSelected.size;
        });

    }, [childrenSelected, checkbox]);

    return function(nodeSelection?: NodeSelection) {
        if(!nodeSelection) return childrenSelected;

        if(nodeSelection.selected) {

            childrenSelected.add(nodeSelection.node.id);

        } else {
            
            childrenSelected.delete(nodeSelection.node.id);

        }

        setChildrenSelected(new Set(childrenSelected));
    };
}

export default useIntermediateCheckbox;