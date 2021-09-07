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
    static construct(rawChildren: Node[]) {
        const wrapper = new Children();
        for(const child of rawChildren) {
            wrapper.push(child);
        }
        return wrapper;
    }
}