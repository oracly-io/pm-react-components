import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import Spinner from '../common/Spinner'

import css from './Connect.module.scss'

const Connect = ({ isConnecting, onClick, className }) => {
  return (
    <a
      title='Connect Wallet'
      className={cn(css.connectButton, className)}
      onClick={onClick}
    >
      {isConnecting ? <Spinner className={css.spinner} /> : <span>Connect</span>}
    </a>
  )
}

Connect.propTypes = {
  isConnecting: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default Connect