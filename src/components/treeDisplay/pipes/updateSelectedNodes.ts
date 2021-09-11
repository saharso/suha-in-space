import NodeMap from '../models/types/nodeMap';
import NodeSelection from '../models/interface/nodeSelection';

const updateSelectedNodes = (prev: NodeMap, selected: NodeSelection): NodeMap => {
    const map = new Map(prev);
    if(selected.selected){
        map.set(selected.node.id, selected.node);
    } else {
        map.delete(selected.node.id)
    }
    return map;
}

export default updateSelectedNodes;