import ActionsEnum from '../actions.enum';

export default interface IAction<T = {}> {
    type: ActionsEnum,
    payload?: any | T;
}