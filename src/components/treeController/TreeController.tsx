
import React from 'react';
import Node from '../treeDisplay/models/node';

export interface ITreeControllerRequests {
    grow?: ()=> void;
    prune?: ()=> void;
    chop?: ()=> void;
}

export type ITreeControllerProps = {
    selectedNode: Node;
    onRequest: ITreeControllerRequests;
}

const TreeDisplay: React.FunctionComponent<ITreeControllerProps> = ({selectedNode, onRequest}) => {

    return <section className="b-treeController">
          <button
            onClick={()=>onRequest?.grow()}
          >
            Grow {selectedNode.id}
          </button>
          
          <button
            onClick={()=>onRequest?.prune()}
          >
            Prune {selectedNode.id}
          </button>
          
          <button
            onClick={()=>onRequest?.chop()}
          >
            Chop
          </button>

    </section>
}

export default TreeDisplay;