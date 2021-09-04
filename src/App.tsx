import {useEffect, useState} from 'react';
import './App.scss';
import Node from './models/node';
import Tree from './models/tree';
import ChildrenDisplay from './components/childrenDisplay/childrenDisplay';
import NodeSelection from './models/interface/nodeSelection';
import NodeMap from './models/type/nodeMap';

const updateSelectedNodes = (prev: NodeMap, selected: NodeSelection): NodeMap => {
  const map = new Map(prev);
  console.log(selected.selected, selected.node.id)
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
  const [sindgleSelectedNode, setSingleSelectedNode] = useState<Node>(tree.root);

  useEffect(()=>{
    setSelectedNodes(new Map())
  }, []);

  useEffect(()=>{
    setSelectedNodesList(Array.from(selectedNodes.values()));
  }, [selectedNodes]);

  useEffect(()=>{
  }, [sindgleSelectedNode]);

  return (
      <div className="App">
        <header>
          <button
            onClick={()=>{
              tree.grow(sindgleSelectedNode.id, {});
              setTree(new Tree(tree));
              setSingleSelectedNode(tree.root);
              console.log(JSON.stringify(tree.root));
            }}
          >grow {sindgleSelectedNode.id}</button>

          <button
            onClick={()=>{
              setTree(new Tree());
              setSelectedNodes(new Map())
            }}
          >Chop</button>
          
          <h2>Selected nodes</h2>
          {selectedNodesList.map((node) => {
            return <button
              key={node.id}
              onClick={()=>{
                setSingleSelectedNode(node)
              }}
            >{node.id}</button>
          })}
        </header>

        <ChildrenDisplay 
            node={tree.root}
            onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
              setSelectedNodes(prev => updateSelectedNodes(prev, nodeSelection));
            }}
        />
      </div>

  );
}

export default App;
