import { useContext } from 'react';

import PMGlobalHeaderProviderContext from './PMGlobalHeaderProviderContext';

const useGHProvider = () => {
  const data = useContext(PMGlobalHeaderProviderContext);
  return data;
};

export default useGHProvider;
