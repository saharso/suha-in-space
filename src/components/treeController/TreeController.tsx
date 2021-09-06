
import React, {useContext, useEffect} from 'react';
import Node from '../treeDisplay/models/node';
import AppContext from '../../models/context';
interface ITreeControllerRequests {
    grow?: ()=> void;
    prune?: ()=> void;
    chop?: ()=> void;
}

type ITreeControllerProps = {
    selectedNode?: Node;
    onRequest?: ITreeControllerRequests;
}

const TreeDisplay: React.FunctionComponent<ITreeControllerProps> = ({selectedNode, onRequest}) => {
  const appContext = useContext(AppContext);
  
    return <section className="b-treeController">
          <button
            onClick={( )=> appContext.actions.grow({})}
          >
            Grow {selectedNode.id}
          </button>
          
          <button
            onClick={()=>appContext.actions.prune()}
          >
            Prune {selectedNode.id}
          </button>
          
          <button
            onClick={()=>appContext.actions.chop()}
          >
            Chop
          </button>

    </section>
}

export default TreeDisplay;