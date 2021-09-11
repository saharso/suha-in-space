import {useEffect}  from 'react';

function useIntermediateCheckbox(checkbox, childrenSelected){
    useEffect(()=>{
        const checkboxEl = checkbox.current;
        checkboxEl.indeterminate = !!childrenSelected.size;
    }, [childrenSelected, checkbox])
}

export default useIntermediateCheckbox;