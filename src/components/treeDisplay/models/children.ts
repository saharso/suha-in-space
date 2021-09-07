import IPojo from "../../../models/interface/pojo";

export default class Children {
    #childMap;
    constructor(){
        this.#childMap = new Map();
    }
    push(childNode){
        this.#childMap.set(childNode.id, childNode)
        this[childNode.id] = childNode;
    }
    delete(nodeId){
        delete this[nodeId];
        this.#childMap.delete(nodeId);
    }
    size(){
        return this.#childMap.size
    }
    chop(){
        this.#childMap.forEach((value, key)=>{
            delete this[key];
        })
        this.#childMap.clear();
    }    
    static toArray(children: Children) {
        const arr = [];
        for(const key in children) {
            if(children.hasOwnProperty(key)) {
                arr.push(children[key]);
            }
        }
        return arr;
    }
    static construct(rawChildren: Node[] | IPojo<Node>) {
        const wrapper = new Children();
        if(Array.isArray(rawChildren)) {
            for(const child of rawChildren) {
                wrapper.push(child);
            }
        } else {
            for(const key in rawChildren) {
                wrapper.push(rawChildren[key]);
            }
        }
        return wrapper;
    }
}