import { useContext } from 'react';

import FeatureTogglesProviderContext from './FeatureTogglesProviderContext';

const useFeatureToggles = () => {
  const data = useContext(FeatureTogglesProviderContext);
  return data;
};

export default useFeatureToggles;
