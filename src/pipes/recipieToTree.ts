import Tree from "../components/treeDisplay/models/tree";
import Node from '../components/treeDisplay/models/node';

import IRecipe from "../models/interface/recipe";

export default function recipeToTree(rawData: IRecipe[]): Tree {
    console.log(rawData);

    let children = Object.values(rawData);
    if(!children) return;
    let childrenBank = children;
    let whatToTraverse = children;
    function rec(){
        let _whatToTraverse = [];
        for(const child of whatToTraverse) {
            const node = new Node();
            if(!child.items) continue;
            // store all children in a bank. This should keep growing.
            childrenBank = childrenBank.concat(Object.values(child.items));
            // this should store only the children to be subsequently traversed.
            _whatToTraverse = _whatToTraverse.concat(Object.values(child.items));
        }
        whatToTraverse = _whatToTraverse;
        if(whatToTraverse.length) rec();
    }   
    rec();

    console.log(childrenBank);
    const tree = new Tree();

    return tree;

}