import React, { useReducer } from 'react';
import PhonerReducer from './PhonerReducer';

const initialRequestParams = { page: 0, size: 10 };

const initialState = {
  cachedPages: {},
  cachedRequestSize: initialRequestParams.size,
  currentRequestParams: initialRequestParams,
  isLoading: true,
};

export const PhonerStoreContext = React.createContext(initialState);
export const PhonerStore = ({ children }) => {
  const [state, dispatch] = useReducer(PhonerReducer, initialState);

  return (
    <PhonerStoreContext.Provider value={[state, dispatch]}>{children}</PhonerStoreContext.Provider>
  );
};

export default PhonerStore;
