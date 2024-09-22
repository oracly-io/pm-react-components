import React, { useCallback } from 'react'

import ToggleButton from '../common/ToggleButton'
import useFeatureToggles from '../../../features/useFeatureToggles'

const FeatureToggleButton = ({
  className,
  name,
  toggledValue,
  untoggledValue,
}) => {
  const { set, get } = useFeatureToggles()

  let toggled = get(name)
  if (toggledValue) toggled = toggled === toggledValue

  const onToggleClick = useCallback((toggled) => {
    if (toggledValue && untoggledValue) {
      set(name, toggled ? toggledValue : untoggledValue)
    } else {
      set(name, toggled)
    }
  }, [set, name, toggledValue, untoggledValue])

  return (
    <ToggleButton
      className={className}
      onClick={onToggleClick}
      toggled={toggled}
    />
  )
}

export default React.memo(FeatureToggleButton)