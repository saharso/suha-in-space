import React, {useEffect, useState} from 'react';
import './App.scss';
import Node from './components/treeDisplay/models/node';
import Tree from './components/treeDisplay/models/tree';
import NodeSelection from './components/treeDisplay/models/interface/nodeSelection';
import NodeMap from './components/treeDisplay/models/types/nodeMap';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import TreeController from './components/treeController/TreeController';
import useTree from './components/treeDisplay/hooks/useTree';
import AppContext from './models/context';
import * as tree1 from './mocks/tree1.json';
import * as list1 from './mocks/list1.json';
import recipeToTree from './pipes/recipieToTree';

function App() {
  const treeMock = tree1 as any;
  const listMock = Tree.treeFromSchema(list1['default'], {data: 'label', children: 'items'}) as any;
  const appTree = new Tree(treeMock.default);
  const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
  const [selectedNodesList, setSelectedNodesList] = useState<Node[]>([]);
  const treeApi = useTree(appTree);

  useEffect(()=>{
    setSelectedNodes(new Map());
  }, []);

  useEffect(()=>{
    setSelectedNodesList(Array.from(selectedNodes.values()));
  }, [selectedNodes]);
  

  return (
    <AppContext.Provider value={treeApi}>

      <div className="App">
        <header>
          <TreeController/>
          
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
    </AppContext.Provider>
  );
}

export default App;
