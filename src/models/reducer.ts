import ActionsEnum from './actions.enum';
import IAction from './interface/actions';
import {IStore} from './store';
import Tree from './tree';

function grow(state: IStore, action: IAction){
    let tree: Tree = state.tree;
    tree = new Tree(tree);
    tree.grow(action.payload.id, action.payload.data);
    return {...state};
}
function reducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case ActionsEnum.GROW: return grow(state, action);
        default: throw new Error();
    }
}

export default reducer;;