function idMaker(parent){
    return parent.id + '_' + parent.children.size();
}
function updateLeafMap(leafMap, node){
    leafMap.set(node.id, node);
    leafMap.delete(node.parent.id);
}
function updateChild(child, parent){
    child.id = idMaker(parent);
    child.parent = parent;    
}

class Node {
    id: string;
    children: Children;
    data: any;
    parent: Node;
    constructor(data?){
        this.data = data;
        this.children = new Children();
    }
}

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

class Tree {
    root: Node;
    flat = new Map();
    leafs = new Map();

    constructor() {
        this.initRoot();
    }

    private initRoot(){
        this.root = new Node();
        this.root.id = '0';
        this.flat = new Map();
        this.flat.set(this.root.id, this.root);
        this.leafs = new Map();        
    }

    appendTo(parent, child) {
        if(!parent) return console.warn('no parent');
        updateChild(child, parent);
        parent.children.push(child);
        updateLeafMap(this.leafs, child);
        this.flat.set(child.id, child);
    }

    getNodeById(nodeId) {
        return this.flat.get(nodeId);
    }
    
    getBranch(nodeId) {
        const node = this.getNodeById(nodeId);
        const branch = new Map();
        let parent = node;
        while(parent) {
            branch.set(parent.id, parent);
            parent = parent.parent;
        }
        return branch;
    }
    
    *climb(nodeId) {
        let node = this.getNodeById(nodeId);
        let nextNodeId = nodeId;
        while(node){
            nextNodeId = yield node;
            node = node.children[nextNodeId];
        }
    }

    prune(nodeId) {
        let node = this.getNodeById(nodeId);
        node.children.chop();
        delete node.parent.children[node.id];
        node = undefined;
        this.flat.delete(nodeId);
        this.leafs.delete(nodeId);
    }

    chop() {
        this.initRoot();
    }
    
}

export default Tree;