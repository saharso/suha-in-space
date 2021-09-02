import {useEffect, useReducer, useState} from 'react';
import './App.scss';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import ActionsEnum from './models/actions.enum';
import reducer from './models/reducer';
import store from './models/store';
import {AppContext} from './models/appContext'
import NodeMap from './models/type/nodeMap';

function App() {
  const [state, dispatch] = useReducer(reducer, store);
  const [selectedNodes, setSelectedNodes] = useState<NodeMap>(new Map());
  const [selectedNodesIds, setSelectedNodesIds] = useState<string[]>([]);
  
  useEffect(()=>{
    dispatch({type: ActionsEnum.EDIT_SELECTED_NODES, payload: selectedNodes});
  }, [selectedNodes]);

  useEffect(()=>{
    setSelectedNodesIds(Array.from(state.selectedNodes.keys()));
  }, [state]);


  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div className="App">
        <header>
          <button
            onClick={()=>{
              dispatch({type: ActionsEnum.GROW, payload: {id: '0', data: 'foo'}});
            }}
          >grow</button>
          <button
            onClick={()=>{
              dispatch({type: ActionsEnum.CHOP});
            }}
          >Chop</button>
          <h2>Selected nodes</h2>
          {selectedNodesIds.map(id => <button key={id}>{id}</button>)}
        </header>
        <TreeDisplay
          onNodeSelectionEdit={(e: NodeMap)=>{
            setSelectedNodes(e);
          }}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
