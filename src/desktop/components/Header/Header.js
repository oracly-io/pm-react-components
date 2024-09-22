import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import css from './Header.module.scss'

const Header = ({ className, children }) => {
  return (
    <div className={cn(css.header, className)}>{children}</div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Header