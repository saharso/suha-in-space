import {useReducer/*, useEffect, useState*/} from 'react';
import './App.scss';
import TreeDisplay from './components/treeDisplay/TreeDisplay';
import ActionsEnum from './models/actions.enum';
import reducer from './models/reducer';
import store from './models/store';

function App() {
  const [state, dispatch] = useReducer(reducer, store);

  return (
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
      </header>
      <TreeDisplay/>
    </div>
  );
}

export default App;
