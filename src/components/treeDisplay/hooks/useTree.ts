import { useState, useCallback } from "react";
import Tree from "../models/tree";
import Node from "../models/node";
import NodeSelection from '../models/interface/nodeSelection';
export interface IUseTreeApi {
    tree: Tree;
    selectedNode: Node;
    actions: {
        grow: Function;
        prune: Function;
        chop: Function;
        selectNodes: Function;
        clone: Function;
        graft: Function;
    }
}
export default function useTree (treeParam): IUseTreeApi {
    const [tree, setTree] = useState<Tree>(treeParam);
    const [selectedNode, setSelectedNode] = useState<Node>(tree.root);

    const grow = useCallback(function(node , data) {
        tree.grow(node.id, data);
        setTree(new Tree(tree));
    }, [tree]);

    const prune = useCallback(function (node) {
        if(!node) return console.warn('No node found for pruning');
        tree.prune(node.id);
        setTree(new Tree(tree));
        setSelectedNode(tree.root);
    }, [tree]);

    const chop = useCallback(function () {
        tree.chop()
        setTree(new Tree(tree));
        setSelectedNode(tree.root);
    }, [tree]);

    const clone = useCallback(function () {
        tree.clone(selectedNode.id)
        setTree(new Tree(tree));
    }, [tree, selectedNode]);

    const graft = useCallback(function () {
        tree.graft('0_1_0', selectedNode.id)
        setTree(new Tree(tree));
    }, [tree, selectedNode]);
    
    const selectNodes = useCallback(function (nodeSelection: NodeSelection) {
        nodeSelection.selected && setSelectedNode(nodeSelection.node)
    }, []);


    return {tree, selectedNode, actions: {grow, prune, chop, selectNodes, clone, graft}};
}