import './App.scss';
import Tree from './components/treeDisplay/models/tree';
import NodeSelection from './components/treeDisplay/models/interface/nodeSelection';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import TreeController from './components/treeController/TreeController';
import useTree from './components/treeDisplay/hooks/useTree';
import AppContext from './models/context';
import * as list1 from './mocks/list1.json';

const listMock = Tree.treeFromSchema(list1['default'], {data: 'label', children: 'items'}) as any;

function App() {
  const appTree = new Tree(listMock);
  const treeApi = useTree(appTree);

  return (
    <AppContext.Provider value={treeApi}>

      <div className="App">
        <header>
          <TreeController/>

        </header>

        <TreeDisplay 
          tree={appTree}
          onNodeSelectionEdit={(nodeSelection: NodeSelection)=>{
            console.log(nodeSelection);
          }}
          onTreeUpdate={(tree)=>{
            console.log(tree);
          }}
        ></TreeDisplay>

      </div>
    </AppContext.Provider>
  );
}

export default App;
