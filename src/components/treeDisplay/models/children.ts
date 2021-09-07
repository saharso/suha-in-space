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
        console.log(nodeId, this);
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
            arr.push(children[key]);
        }
        return arr;
    }
}