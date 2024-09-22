import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import Spinner from '../common/Spinner'

import css from './Connect.module.scss'

const Connect = ({ className, isConnecting, onClick }) => {
  return (
    <div className={cn(css.connect, className)}>
      <a
        title='Connect Wallet'
        className={cn(css.connectButton, { [css.connection]: isConnecting })}
        onClick={onClick}
      >
        <span>Connect</span>
        {isConnecting && <Spinner />}
      </a>
   </div>
  )
}

Connect.propTypes = {
  className: PropTypes.string,
  isConnecting: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Connect
