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

export default function useTree (treeParam): any {
    const [tree, setTree] = useState<Tree>(treeParam || new Tree());
    const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
    const [selectedNode, setSelectedNode] = useState<Node>(tree.root);

    const requestGrow = useCallback(function(selectedNode: Node, data) {
        tree.grow(selectedNode.id, data);
        setTree(new Tree(tree));
    }, []);

    const prune = useCallback(function (selectedNode) {
        tree.prune(selectedNode.id);
        setTree(new Tree(tree));
    }, [])
    const chop = useCallback(function () {
        tree.chop()
        setTree(new Tree(tree));
    }, [])

    useEffect(()=>{
        // console.log(tree)
    }, [tree])

    return [tree, requestGrow, prune, chop];
}