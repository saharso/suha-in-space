
import React, {useContext} from 'react';
import AppContext from '../../models/context';

const TreeDisplay: React.FunctionComponent = () => {
  const appContext = useContext(AppContext);
  
    return <section className="b-treeController">
          <button
            onClick={( )=> appContext.actions.grow({})}
          >
            Grow {appContext.selectedNode.id}
          </button>
          
          <button
            onClick={()=>appContext.actions.prune()}
          >
            Prune {appContext.selectedNode.id}
          </button>
          
          <button
            onClick={()=>appContext.actions.chop()}
          >
            Chop
          </button>
          <button
            onClick={()=>appContext.actions.clone()}
          >
            Clone
          </button>

    </section>
}

export default TreeDisplay;