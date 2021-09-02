import { convertToObject } from "typescript";

export default class Children {
    childMap: Map<string, Node>;
    constructor(){
        this.childMap = new Map();
    }
    push(childNode){
        this.childMap.set(childNode.id, childNode)
        this[childNode.id] = childNode;
        console.log(this);
    }
    size(){
        return this.childMap.size
    }
    chop(){
        this.childMap.forEach((value, key)=>{
            delete this[key];
        })
        this.childMap.clear();
    }    
    static toArray(children: Children) {
        const arr = [];
        for(const key in children) {
            if(children[key].constructor.name === 'Node') {
                arr.push(children[key]);
            }
        }
        return arr;
    }
    
}