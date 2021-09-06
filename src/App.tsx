import {useEffect, useState} from 'react';
import './App.scss';
import Node from './components/treeDisplay/models/node';
import Tree from './components/treeDisplay/models/tree';
import NodeSelection from './components/treeDisplay/models/interface/nodeSelection';
import NodeMap from './components/treeDisplay/models/types/nodeMap';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import TreeController from './components/treeController/TreeController';
import useTree from './components/treeDisplay/hooks/useTree';

function App() {
  const appTree = new Tree();
  const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
  const [selectedNodesList, setSelectedNodesList] = useState<Node[]>([]);
  const treeApi = useTree(appTree);

  const grow = () => {
    treeApi.actions.grow({});
  }

  const prune = () => {
    treeApi.actions.prune();
  }

  const chop = ()=> {
    treeApi.actions.chop();
  }

  useEffect(()=>{
    setSelectedNodes(new Map());
  }, []);

  useEffect(()=>{
    setSelectedNodesList(Array.from(selectedNodes.values()));
  }, [selectedNodes]);

  return (
      <div className="App">
        <header>
          <TreeController
            selectedNode={treeApi.selectedNode}
            onRequest={{grow, prune, chop}}
          />
          
          <h2>Selected nodes</h2>
          {selectedNodesList.map((node) => {
            return <button
              key={node.id}
              onClick={()=>{
                treeApi.actions.selectNodes({selected: true, node})
              }}
            >{node.id}</button>
          })}
        </header>

        <TreeDisplay 
          tree={treeApi.tree}
          onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
            treeApi.actions.selectNodes(nodeSelection)
          }}
        />
      </div>

  );
}

export default App;
