import { createContext, useContext } from 'react';

const BackendContext = createContext();

export const BackendProvider = ({ children, backend }) => {

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackendServer = () => {
  const backend = useContext(BackendContext);
  return backend;
};
