import {useEffect, useState} from 'react';
import './App.scss';
import Node from './models/node';
import Tree from './models/tree';
import ChildrenDisplay from './components/childrenDisplay/childrenDisplay';
import NodeSelection from './models/interface/nodeSelection';
import NodeMap from './models/type/nodeMap';

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

          <button
            onClick={grow}
          >
            grow {selectedNode.id}
          </button>
          
          <button
            onClick={prune}
          >
            prune {selectedNode.id}
          </button>
          
          <button
            onClick={chop}
          >
            Chop
          </button>

          
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

        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
              setSelectedNodes(prev => updateSelectedNodes(prev, nodeSelection));
              nodeSelection.selected && setSelectedNode(nodeSelection.node)
            }}
        />
      </div>

  );
}

export default App;
