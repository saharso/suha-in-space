import {useEffect, useState} from 'react';
import './App.scss';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import Tree from './models/tree';
import NodeMap from './models/type/nodeMap';

function App() {
  const [tree, setTree] = useState<Tree>(new Tree());

  useEffect(() => {
    // setTree(new Tree());
  }, [])

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
            }}
          >Chop</button>
          <h2>Selected nodes</h2>
        </header>
        <TreeDisplay
          tree={tree}
          onNodeSelectionEdit={(e: NodeMap)=>{

          }}
        />
      </div>

  );
}

export default App;
