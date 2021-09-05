import Tree from '../components/treeDisplay/models/tree';
import NodeMap from '../components/treeDisplay/models/types/nodeMap';
export interface IStore {
    tree: Tree;
    selectedNodes: NodeMap;
}

const store: IStore = {
    tree: new Tree(),
    selectedNodes: new Map(),
}

export default store;