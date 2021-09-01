class Children {
    childMap: Map<string, Node>;
    constructor(){
        this.childMap = new Map();
    }
    push(childNode){
        this.childMap.set(childNode.id, childNode)
        this[childNode.id] = childNode;
    }
    size(){
        return this.childMap.size
    }
}

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
