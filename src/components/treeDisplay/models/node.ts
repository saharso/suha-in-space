import Children from './children';

export default class Node {
    id: string;
    children: Children;
    data: any;
    get parentId(): string {return this.id.substring(0, this.id.length -2)};
    constructor(data?){
        this.data = data;
    }
}