import ActionsEnum from './actions.enum';
import IAction from './interface/actions';
import {IStore} from './store';
function grow(state: IStore, action: IAction){
    state.tree.grow(action.payload.id, action.payload.data);
    console.log(action);
    console.log(state);
    return {...state};
}
function reducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case ActionsEnum.GROW: return grow(state, action);
        default: throw new Error();
    }
}

export default reducer;;