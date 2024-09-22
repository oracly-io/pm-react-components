import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import MetaMask from '../SVG/MetaMask'
import WalletConnect from '../SVG/WalletConnect'
import CoinbaseWallet from '../SVG/CoinbaseWallet'
import Uniswap from '../SVG/Uniswap'

import css from './Connector.module.scss'

const supportedConnectors = {
  uniswap: {
    name: 'Uniswap',
    icon: <Uniswap/>,
  },
  metamask: {
    name: 'MetaMask',
    icon: <MetaMask/>,
  },
  walletconnect: {
    name: 'WalletConnect',
    icon: <WalletConnect/>,
  },
  coinbase: {
    name: 'CoinbaseWallet',
    icon: <CoinbaseWallet/>,
  }
}

const Connector = ({ id, injectedProviderType, onClick }) => {

  const handleClick = useCallback(() => {
    if (onClick) onClick(id)
  }, [id, onClick])

  let connector
  if (id === 'injected') {
    connector = supportedConnectors[injectedProviderType]
  } else {
    connector = supportedConnectors[id]
  }

  const recommend = id === 'injected' && injectedProviderType === 'uniswap'

  if (!connector) return null

  return (
    <li className={cn(css.container, {[css.recommended]: recommend})} onClick={handleClick}>
      <span className={css.icon}>{connector.icon}</span>
      <span className={css.name}>{connector.name}</span>
      {recommend && <span className={css.recommend}>Recommend</span>}
    </li>
  )
}

Connector.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  injectedProviderType: PropTypes.string,
}

export default React.memo(Connector)
