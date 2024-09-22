import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import config from '@config'

import { FeatureTogglesProvider } from '../FeatureToggle'
import PMGlobalHeaderProvider from '../PMGlobalHeaderProvider'
import StatisticsBar from '../StatisticsBar'
import Header from '../Header'
import Connect from '../Connect'
import AuthModal from '../AuthModal'
import { useModal } from '../modals';

const PMGlobalHeader = ({
  headerClassName,
  connectClassName,
  currencyFill,
  maximumFractionDigits,
  maximumFractionDigitsPrecent,
  featureToggles,
  mustUserLogin,
  account,
  statisticsAccount,
  statisticsNickname,
  statistics,
  connectors,
  activeNavigationItem,
  isConnecting,
  isConnected,
  isStatisticsBarOpened: isStatisticsBarOpenedControlled,
  showInstallApp,
  onConnectClick,
  onConnectorClick,
  onDisconnectClick,
  onStatisticsBarCloseClick,
  content,
  children,
  onInstallAppClick,
  onSupportClick,
  onNicknameChanged,
  injectedProviderType,
}) => {
  const { modal, open: openAuthModal, close: closeAuthModal } = useModal({
    Content: AuthModal,
    hideClose: true,
    shouldCloseOnOverlayClick: false,
    openOnMount: mustUserLogin,
    onConnectorClick,
    connectors,
    isConnected,
    injectedProviderType,
  })

  const isStatisticsBarContolled = isStatisticsBarOpenedControlled !== undefined

  const [isStatisticsBarOpened, setStatisticsBarOpened] = useState(false)
  const openStatisticBar = useCallback(() => !isStatisticsBarContolled && setStatisticsBarOpened(true), [isStatisticsBarContolled])
  const closeStatisticBar = useCallback(() => !isStatisticsBarContolled && setStatisticsBarOpened(false), [isStatisticsBarContolled])

  const handleConnectClick = useCallback(() => {
    onConnectClick && onConnectClick()
    openAuthModal({ hideClose: false, shouldCloseOnOverlayClick: true })
  }, [onConnectClick, openAuthModal])

  const handleCloseStatisticsBar = useCallback(() => {
    if (onStatisticsBarCloseClick) onStatisticsBarCloseClick()
    closeStatisticBar()
  }, [closeStatisticBar, onStatisticsBarCloseClick])

  const handleDisconnectClick = useCallback(() => {
    if (onDisconnectClick) onDisconnectClick()
    closeStatisticBar()
  }, [closeStatisticBar, onDisconnectClick])

  const openInstallApp = useCallback(() => {
    handleCloseStatisticsBar()
    onInstallAppClick()
  }, [handleCloseStatisticsBar, onInstallAppClick])

  const handleNicknameChange = useCallback((e) => {
    if (onNicknameChanged) onNicknameChanged(e)
  }, [onNicknameChanged])

  return (
    <FeatureTogglesProvider toggles={featureToggles}>
      <PMGlobalHeaderProvider
        currencyFill={currencyFill}
        openAuthModal={openAuthModal}
        closeAuthModal={closeAuthModal}
        maximumFractionDigits={maximumFractionDigits}
        maximumFractionDigitsPrecent={maximumFractionDigitsPrecent}
      >
        <Header className={headerClassName}>{content}</Header>
        {!isConnected && (
          <Connect 
            className={connectClassName}
            isConnecting={isConnecting}
            onClick={handleConnectClick}
          />
        )}
        <StatisticsBar
          address={statisticsAccount}
          username={statisticsNickname}
          activeNavigationItem={activeNavigationItem}
          isSelfView={isConnected && (account === statisticsAccount)}
          isOpened={isStatisticsBarContolled ? isStatisticsBarOpenedControlled : isStatisticsBarOpened}
          statistics={statistics}
          showInstallApp={showInstallApp}
          onCloseClick={handleCloseStatisticsBar}
          onDisconnectClick={handleDisconnectClick}
          onInstallAppClick={openInstallApp}
          onSupportClick={onSupportClick}
          onNicknameChanged={handleNicknameChange}
        />
        {children}
        {modal}
      </PMGlobalHeaderProvider>
      <div id={config.modal_id} />
    </FeatureTogglesProvider>
  )
}

PMGlobalHeader.propTypes = {
  headerClassName: PropTypes.string,
  currencyFill: PropTypes.string,
  maximumFractionDigits: PropTypes.number,
  maximumFractionDigitsPrecent: PropTypes.number,
  mustUserLogin: PropTypes.bool,
  account: PropTypes.string,
  statisticsAccount: PropTypes.string,
  statisticsNickname: PropTypes.string,
  connectors: PropTypes.array,
  activeNavigationItem: PropTypes.string,
  statistics: PropTypes.object,
  showInstallApp: PropTypes.bool,
  isConnecting: PropTypes.bool,
  isConnected: PropTypes.bool,
  isStatisticsBarOpened: PropTypes.bool,
  onConnectorClick: PropTypes.func,
  onNicknameChanged: PropTypes.func,
  onConnectClick: PropTypes.func,
  onDisconnectClick: PropTypes.func,
  onStatisticsBarCloseClick: PropTypes.func,
  onInstallAppClick: PropTypes.func,
  content: PropTypes.node,
  children: PropTypes.node,
  featureToggles: PropTypes.object,
  onSupportClick: PropTypes.func,
  injectedProviderType: PropTypes.string,
}

export default React.memo(PMGlobalHeader)