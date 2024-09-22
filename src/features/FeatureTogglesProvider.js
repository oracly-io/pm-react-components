import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { mapValues } from 'lodash'

import FeatureTogglesProviderContext from './FeatureTogglesProviderContext';

const FeatureTogglesProvider = ({ toggles: featureToggles, children }) => {

  const [toggles, setToggles] = useState(featureToggles)

  const get = useCallback((name) => toggles?.[name]?.value, [toggles])
  const set = useCallback((name, value) => {
    setToggles((toggles) => ({ ...toggles, [name]: { ...toggles[name], value } }))
  }, [])

  const value = useMemo(
    () => ({
      toggles: featureToggles,
      get,
      set,
      features: mapValues(toggles, ({ value }) => value),
    }),
    [toggles, get, set]
  );

  return (
    <FeatureTogglesProviderContext.Provider value={value}>
      {children}
    </FeatureTogglesProviderContext.Provider>
  )
}

FeatureTogglesProvider.propTypes = {
  toggles: PropTypes.object,
  children: PropTypes.node,
}

export default FeatureTogglesProvider