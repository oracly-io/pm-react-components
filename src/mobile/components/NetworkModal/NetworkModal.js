import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import { NETWORK_STATUS } from '@constants'
import Button from '../common/Button'
import WiFiSuccess from '../SVG/WiFiSuccess'
import WiFiWarning from '../SVG/WiFiWarning'
import WiFiError from '../SVG/WiFiError'
import CloseIcon from '../SVG/CloseIcon'

import css from './NetworkModal.module.scss'

const NetworkModal = ({ className, networkStatus, close, rows }) => {

  if (!networkStatus) return null

  return (
    <div className={cn(css.container, className)}>
      <Button onClick={close} className={css.close}>
        <CloseIcon />
      </Button>
      <div className={css.content}>
        <div className={cn(css.wifi, {
          [css.error]: networkStatus === NETWORK_STATUS.ERROR,
          [css.warning]: networkStatus === NETWORK_STATUS.WARNING,
          [css.success]: networkStatus === NETWORK_STATUS.SUCCESS,
        })}>
          {networkStatus === NETWORK_STATUS.SUCCESS && <WiFiSuccess />}
          {networkStatus === NETWORK_STATUS.WARNING && <WiFiWarning />}
          {networkStatus === NETWORK_STATUS.ERROR && <WiFiError />}
        </div>
        <div className={css.description}>
          {networkStatus === NETWORK_STATUS.WARNING && 'Data is currently out of date. Please wait while it is syncing...'}
          {networkStatus === NETWORK_STATUS.ERROR && 'Unable to sync data. Check internet connection'}
          {networkStatus === NETWORK_STATUS.SUCCESS && 'Synchronized data'}
        </div>
        <div className={css.table}>

          {rows.map(({ name, value }) => (
            <div key={name} className={css.row}>
              <div className={css.name}>{name}</div>
              <div className={css.value}>{value}</div>
            </div>  
          ))}

        </div>
      </div>
    </div>
  )
}

NetworkModal.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array,
  networkStatus: PropTypes.string,
  close: PropTypes.func,
}

export default NetworkModal