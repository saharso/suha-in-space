import {useEffect, useState} from 'react';
import './App.scss';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import Children from './models/children';
import Node from './models/node';
import Tree from './models/tree';
import NodeMap from './models/type/nodeMap';

function App() {
  const [tree, setTree] = useState<Tree>(new Tree());
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [count, setCount] = useState(0);

  const updateSelectedNodes = (selectedNodes: Node[])=>{
    setSelectedNodes(selectedNodes);
    console.log(selectedNodes);
  }

  useEffect(() => {
    // setTree(new Tree());
    console.log(count);
  }, [count])

  return (
      <div className="App">
        <header>
          <button
            onClick={()=>{
              tree.grow('0', {});
              setTree(new Tree(tree));
            }}
          >grow</button>
          <button
            onClick={()=>{
              setTree(new Tree());
              setSelectedNodes([]);
            }}
          >Chop</button>
          <h2>Selected nodes</h2>
          {selectedNodes.map((node) => {
            return <button key={node.id}>{node.id}</button>
          })}
        </header>
        <TreeDisplay
          tree={tree}
          onNodeSelectionEdit={updateSelectedNodes}
        />
      </div>

  );
}

export default App;
