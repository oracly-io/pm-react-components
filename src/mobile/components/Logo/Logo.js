import React from 'react'
import PropTypes from 'prop-types'

import LogoIcon from '../SVG/Logo'

import css from './Logo.module.scss'

const Logo = ({ basepath, logoFill }) => {
  return (
    <a href={basepath} className={css.container} tabIndex={-1}>
      <LogoIcon fill={logoFill} />
    </a>
  )
}

Logo.propTypes = {
  basepath: PropTypes.string,
  logoFill: PropTypes.string,
}

export default Logo