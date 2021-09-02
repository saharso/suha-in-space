import Tree from './tree';
export interface IStore {
    tree: Tree;
}

const store: IStore = {
    tree: new Tree(),
}

export default store;