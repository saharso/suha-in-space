import React, {useState} from 'react';
import './App.scss';
import Tree from './models/tree';

const tree = new Tree();
function App() {
  return (
    <div className="App">
      <button
        onClick={()=>{
          tree.grow('0','foo');
          console.log(tree);
        }}
      >grow</button>

    </div>
  );
}

export default App;
