import {useEffect, useState} from 'react';
import './App.scss';
import Node from './components/treeDisplay/models/node';
import Tree from './components/treeDisplay/models/tree';
import NodeSelection from './components/treeDisplay/models/interface/nodeSelection';
import NodeMap from './components/treeDisplay/models/types/nodeMap';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import TreeController from './components/treeController/TreeController';

const updateSelectedNodes = (prev: NodeMap, selected: NodeSelection): NodeMap => {
  const map = new Map(prev);
  if(selected.selected){
      map.set(selected.node.id, selected.node);
  } else {
      map.delete(selected.node.id)
  }
  return map;
}

function App() {
  const [tree, setTree] = useState<Tree>(new Tree());
  const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
  const [selectedNodesList, setSelectedNodesList] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node>(tree.root);

  const grow = () => {
    tree.grow(selectedNode.id, {});
    setTree(new Tree(tree));
  }
  const prune = () => {
    setSelectedNodes(prev => updateSelectedNodes(prev, {selected: false, node: selectedNode}));
    tree.prune(selectedNode.id);
    setTree(new Tree(tree));
    setSelectedNode(tree.root);
  }

  const chop = ()=> {
    tree.chop()
    setTree(new Tree(tree));
    setSelectedNodes(new Map());
    setSelectedNode(tree.root);
  }

  useEffect(()=>{
    setSelectedNodes(new Map())
  }, []);

  useEffect(()=>{
    setSelectedNodesList(Array.from(selectedNodes.values()));
  }, [selectedNodes]);

  return (
      <div className="App">
        <header>
          <TreeController
            selectedNode={selectedNode}
            onRequest={{grow, prune, chop}}
          />
          
          <h2>Selected nodes</h2>
          {selectedNodesList.map((node) => {
            return <button
              key={node.id}
              onClick={()=>{
                setSelectedNode(node);
              }}
            >{node.id}</button>
          })}
        </header>

        <TreeDisplay 
          tree={tree}
          onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
            setSelectedNodes(prev => updateSelectedNodes(prev, nodeSelection));
            nodeSelection.selected && setSelectedNode(nodeSelection.node)
          }}
        />
      </div>

  );
}

export default App;
