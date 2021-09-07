import { useEffect, useState, useCallback } from "react";
import Tree from "../models/tree";
import Node from "../models/node";
import NodeMap from '../models/types/nodeMap';
import NodeSelection from '../models/interface/nodeSelection';

const updateSelectedNodes = (prev: NodeMap, selected: NodeSelection): NodeMap => {
    const map = new Map(prev);
    if(selected.selected){
        map.set(selected.node.id, selected.node);
    } else {
        map.delete(selected.node.id)
    }
    return map;
  }

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
    const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
    const [selectedNode, setSelectedNode] = useState<Node>(tree.root);

    console.log(tree);

    const grow = useCallback(function(data) {
        tree.grow(selectedNode.id, data);
        setTree(new Tree(tree));
    }, [tree, selectedNode]);

    const prune = useCallback(function () {
        tree.prune(selectedNode.id);
        setTree(new Tree(tree));
        setSelectedNode(tree.root);
    }, [tree, selectedNode]);

    const chop = useCallback(function () {
        tree.chop()
        setTree(new Tree(tree));
        setSelectedNode(tree.root);
    }, [tree]);

    const clone = useCallback(function () {
        tree.clone(selectedNode.id)
        setTree(new Tree(tree));
    }, [selectedNode]);

    const graft = useCallback(function () {
        tree.graft('0_1_0', selectedNode.id)
        setTree(new Tree(tree));
    }, [selectedNode]);
    
    const selectNodes = useCallback(function (nodeSelection: NodeSelection) {
        setSelectedNodes(prev => updateSelectedNodes(prev, nodeSelection));
        nodeSelection.selected && setSelectedNode(nodeSelection.node)
    }, []);

    useEffect(()=>{
        setTree(new Tree(tree));
    }, [])

    return {tree, selectedNode, actions: {grow, prune, chop, selectNodes, clone, graft}};
}