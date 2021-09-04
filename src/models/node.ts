import Children from './children';
import NodeData from './interface/nodeData';

export default class Node {
    id: string;
    children: Children;
    data: NodeData;
    parentId: string;
    constructor(data?){
        this.data = data;
        // this.children = new Children();
    }
}