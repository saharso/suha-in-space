import ActionsEnum from './actions.enum';
import IAction from './interface/actions';
import NodeSelection from '../components/treeDisplay/models/interface/nodeSelection';
import {IStore} from './store';

function grow(state: IStore, action: IAction){
    state.tree.grow(action.payload.id, action.payload.data);
    return {...state};
}
function chop(state: IStore, action: IAction){
    state.tree.chop();
    state.selectedNodes = new Map();
    return {...state};
}
function editSelectedNodes(state: IStore, action: IAction<NodeSelection>) {
    state.selectedNodes = action.payload;
    return {...state}
}
function reducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case ActionsEnum.GROW: return grow(state, action);
        case ActionsEnum.CHOP: return chop(state, action);
        case ActionsEnum.EDIT_SELECTED_NODES: return editSelectedNodes(state, action);
        default: throw new Error();
    }
}

export default reducer;;