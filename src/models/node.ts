import Children from './children';

export default class Node {
    id: string;
    children: Children;
    data: any;
    parent: Node;
    constructor(data?){
        this.data = data;
        this.children = new Children();
    }
}
