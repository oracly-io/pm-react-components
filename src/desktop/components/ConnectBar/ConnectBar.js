import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import { useTransition } from '../../../hooks/useTransition'
import ArrowForward from '../SVG/ArrowForward'
import Connector from '../Connector'

import css from './ConnectBar.module.scss'

const ConnectBar = ({
  connectors,
  injectedProviderType,
  isOpened,
  onCloseClick,
  onConnectorClick,
}) => {

  const timeout = 100 //ms
  const [mount, opening] = useTransition(isOpened, timeout)

  if (!mount) return null

  return (
    <div className={cn(css.container, { [css.opened]: opening } )}>
      <div className={css.title}>
        <span>Connect to Wallet</span>
        <span
          className={css.close}
          onClick={onCloseClick}
        >
          <ArrowForward />
        </span>
      </div>
      <ul>
        {connectors.map((connectorId) =>
          <Connector
            key={connectorId}
            id={connectorId}
            injectedProviderType={injectedProviderType}
            onClick={onConnectorClick}
          />
        )}
      </ul>
      <p className={css.policy}>By connecting a wallet, you agree to Uniswap Labs&apos; <a href="https://uniswap.org/terms-of-service" target="_blank" rel="noreferrer">Terms of Service</a> and consent to its <a href="https://uniswap.org/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy.</a> (Last Updated 11.17.22)</p>
    </div>
  )
}

ConnectBar.propTypes = {
  isOpened: PropTypes.bool,
  connectors: PropTypes.array,
  injectedProviderType: PropTypes.string,
  onCloseClick: PropTypes.func,
  onConnectorClick: PropTypes.func,
}

export default React.memo(ConnectBar)
