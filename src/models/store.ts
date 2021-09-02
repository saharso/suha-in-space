import Tree from './tree';
import NodeMap from './type/nodeMap';
export interface IStore {
    tree: Tree;
    selectedNodes: NodeMap;
}

const store: IStore = {
    tree: new Tree(),
    selectedNodes: new Map(),
}

export default store;