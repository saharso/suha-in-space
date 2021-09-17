
import React from 'react';
import ProtagonistConfig from '../../../models/config';

const ProtagonistContext = React.createContext<any>({config: new ProtagonistConfig()});

export default ProtagonistContext;