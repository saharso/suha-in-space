
import Node from './node';
import Children from './children';
export default class Tree {
    root: Node;
    flat: Map<string, Node> = new Map();
    leafs: Map<string, Node> = new Map();

    constructor(trunk?: Tree) {
        this.initRoot(trunk);
    }

    private initRoot(trunk?: Tree) {
        this.root = trunk?.root || new Node();
        this.root.id = '0';
        this.flat = trunk?.flat || new Map();
        this.flat.set(this.root.id, this.root);
        this.leafs = trunk?.leafs || new Map();
    }

    grow(parentId, data: any) {
        const parent = this.getNodeById(parentId);
        if(!parent) return console.warn('no parent');
        const child = new Node(data);
        if(!parent.children) {
            parent.children = new Children();
        }
        child.parentId = parent.id;
        child.id = _idMaker(parent);
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
            parent = this.getNodeById(parent.parentId);
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
        node.children?.chop();
        const parent = this.getNodeById(node.parentId);
        if (parent) {  
            delete parent.children[node.id];
            this.flat.delete(nodeId);
            this.leafs.delete(nodeId);
        }
    }

    chop() {
        this.initRoot();
    }

    clone(nodeId): Tree {
        const cutting = this.getNodeById(nodeId);
        const sapling = new Tree();
        const saplingMetaData = _flattenNodeChildren(cutting);
        sapling.root = cutting;
        sapling.flat = saplingMetaData.flat;
        sapling.leafs = saplingMetaData.leafs;
        return sapling;
    }
}

function _idMaker(parent){
    return parent.id + '_' + parent.children.size();
}
function _updateLeafMap(leafMap, node){
    leafMap.set(node.id, node);
    leafMap.delete(node.parentId);
}
function _flattenNodeChildren(node: Node) {
    if(!node.children) return;
    let children = Object.values(node.children);
    let totalChildIds = children;
    const flat = new Map();
    const leafs = new Map();
    const rec = (children) => {
        let currentChildIds = [];
        for(const child of children) {
            if(!child.children) continue;
            children = Object.values(child.children);
            currentChildIds = currentChildIds.concat(children);
            totalChildIds = totalChildIds.concat(children);
        }
        if(currentChildIds.length) rec(children);
    }
    rec(children);
    for(const child of totalChildIds) {
        if(!child.children) {
            leafs.set(child.id, child)
        }
        flat.set(child.id, child);
    }
        
    return {flat, leafs};
}
