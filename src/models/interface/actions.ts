import ActionsEnum from '../actions.enum';

export default interface IAction {
    type: ActionsEnum,
    payload?: any,
}