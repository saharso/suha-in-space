import Children from './children';

export default class Node {
    id: string;
    children: Children;
    data: any;
    parentId: string;
    constructor(data?){
        this.data = data;
    }
}