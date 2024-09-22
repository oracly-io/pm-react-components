import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import Connector from '../Connector'

import css from './AuthModal.module.scss'

const AuthModal = ({ close, isConnected, connectors, onConnectorClick, injectedProviderType }) => {

  useEffect(() => {
    if (isConnected) close()
  }, [isConnected])

  const onClick = useCallback((connectorId) => {
    close()
    onConnectorClick(connectorId)
  }, [onConnectorClick])

  useEffect(() => {
    if (connectors.length === 1 && !isConnected) {
      onClick(connectors[0])
    }
  }, [connectors.length, isConnected])

  return (
    <div className={css.container}>
      <div className={css.title}>Connect to Wallet</div>
      <ul className={css.connectors}>
        {connectors.map((connectorId) => (
          <Connector
            key={connectorId}
            id={connectorId}
            injectedProviderType={injectedProviderType}
            onClick={onClick}
          >
            {connectorId}
          </Connector>
        ))}
      </ul>
    </div>
  )
}

AuthModal.propTypes = {
  close: PropTypes.func.isRequired,
  connectors: PropTypes.array,
  isConnected: PropTypes.bool,
  injectedProviderType: PropTypes.string,
  onConnectorClick: PropTypes.func.isRequired
}

export default AuthModal