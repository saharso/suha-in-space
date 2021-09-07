
import Node from './node';
import Children from './children';
export default class Tree {
    root: Node;
    flat: Map<string, Node> = new Map();
    leafs: Map<string, Node> = new Map();

    constructor(trunk?: Tree | Node) {
        if(trunk instanceof Tree) {
            this.sproutFromTree(trunk);
        } else {
            this.sproutFromNode(trunk)
        }
    }

    private sproutFromTree(trunk?: Tree) {
        this.root = trunk?.root || new Node();
        this.root.id = '0';
        this.flat = trunk?.flat || new Map();
        this.flat.set(this.root.id, this.root);
        this.leafs = trunk?.leafs || new Map();
    }

    private sproutFromNode(trunk?: Node) {
        if(!trunk) return this.sproutFromTree();
        this.clone(trunk, this);
        console.log(this);
    }

    grow(nodeId, data: any) {
        const parent = this.getNodeById(nodeId);
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
        this.sproutFromTree();
    }

    clone(nodeData: string | Node, tree? : Tree): Tree {
        const cutting: Node = nodeData instanceof String ? this.getNodeById(nodeData) : nodeData as Node;
        const sapling = tree || new Tree();
        sapling.root = cutting;
        const saplingMetaData = _handleNodeChildren(cutting);
        sapling.flat = saplingMetaData.flat;
        sapling.leafs = saplingMetaData.leafs;
        return sapling;
    }

    graft(graftFromId: string, graftToId: string) {
        const graftFrom = this.getNodeById(graftFromId);
        const graftTo = this.getNodeById(graftToId);
        const branch = this.clone(graftFromId);
        graftTo.parentId = graftFrom.id;
        if(!graftTo.children) graftTo.children = new Children();
        graftTo.children.push(branch.root);
        this.getNodeById(graftFrom.parentId).children.delete(graftFrom.id);
    }
}

function _idMaker(parent){
    return parent.id + '_' + parent.children.size();
}
function _updateLeafMap(leafMap, node){
    leafMap.set(node.id, node);
    leafMap.delete(node.parentId);
}
function _getAllChildren(node: Node) {
    // take a node and traverse its children.
    let children = Object.values(node.children);
    let childrenBank = children;
    let whatToTraverse = children;
    if(!children) return;
    function rec(){
        let _whatToTraverse = [];
        for(const child of whatToTraverse) {
            if(!child.children) continue;
            // store all children in a bank. This should keep growing.
            childrenBank = childrenBank.concat(Object.values(child.children));
            // this should store only the children to be subsequently traversed.
            _whatToTraverse = _whatToTraverse.concat(Object.values(child.children));
        }
        whatToTraverse = _whatToTraverse;
        if(whatToTraverse.length) rec();
    }   
    rec();
    return childrenBank;
}
function _handleNodeChildren(node: Node) {
    const flat = new Map();
    const leafs = new Map();
    const allChildren = _getAllChildren(node)
    for(const child of allChildren) {
        if(!child.children) {
            leafs.set(child.id, child)
        }
        flat.set(child.id, child);
        child.children = Children.construct(child.children);   
    }
        
    return {flat, leafs};
}
