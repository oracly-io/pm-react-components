import React, { useState } from 'react'
import cn from 'clsx'

import css from './ToggleButton.module.scss'

const ToggleButton = ({ toggled, onClick, className }) => {
  const [isToggled, toggle] = useState(toggled)

  const onInputClick = () => {
    toggle(!isToggled)
    onClick(!isToggled)
  }

  return (
    <label className={cn(css.label, className)}>
      <input className={css.input} type="checkbox" defaultChecked={isToggled} onClick={onInputClick} />
      <span className={css.span} />
    </label>
  )
}

export default React.memo(ToggleButton)