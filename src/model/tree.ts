import Node from './node';
export default class Tree {
    root: Node;
    flat: Map<string, Node> = new Map();
    leafs: Map<string, Node> = new Map();

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
        _updateLeafMap(this.leafs, child);
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

function _idMaker(parent){
    return parent.id + '_' + parent.children.size();
}
function _updateLeafMap(leafMap, node){
    leafMap.set(node.id, node);
    leafMap.delete(node.parent.id);
}
function updateChild(child, parent){
    child.id = _idMaker(parent);
    child.parent = parent;    
}