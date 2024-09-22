import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import css from './DropdownOption.module.scss'

const DropdownOption = ({
  className,
  option,
  selected,
  renderer,
  onClick
}) => {
  return (
    <div
      className={cn(css.option, className)}
      onClick={() => onClick(option)}
    >
      {renderer(option, selected)}
    </div>
  )
}

DropdownOption.propTypes = {
  className: PropTypes.string,
  option: PropTypes.any,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  renderer: PropTypes.func,
}

export default DropdownOption