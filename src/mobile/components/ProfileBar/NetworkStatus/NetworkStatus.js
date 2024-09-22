import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import css from './NetworkStatus.module.scss'

const NetworkStatus = ({ type }) => {
  return (
    <div
      className={cn(css.status, {
        [css.success]: type === 'success',
        [css.warning]: type === 'warning',
        [css.error]: type === 'error',
      })}
    />
  )
}

NetworkStatus.propTypes = {
  type: PropTypes.string,
}

export default NetworkStatus