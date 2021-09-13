
import React from 'react';
import ProtagonistConfig from './config';

const ProtagonistContext = React.createContext<any>({config: new ProtagonistConfig()});

export default ProtagonistContext;