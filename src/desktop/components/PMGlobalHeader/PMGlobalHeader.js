import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import config from '../../../config'
import { FeatureTogglesProvider }from '../FeatureToggle'
import PMGlobalHeaderProvider from '../PMGlobalHeaderProvider'
import Navbar from '../Navbar'
import Header from '../Header'
import ProfileBar from '../ProfileBar'
import ConnectBar from '../ConnectBar'
import StatisticsBar from '../StatisticsBar'
import Connect from '../Connect'
import AuthModal from '../AuthModal'
import { useModal } from '../modals';

const PMGlobalHeader = ({
  headerClassName,
  connectClassName,
  profileBarClassName,
  profileBarInnerClassName,
  basepath = "/",
  logoFill,
  logoLabelFill,
  currencyFill,
  maximumFractionDigits,
  maximumFractionDigitsPrecent,
  mustUserLogin,
  isConnecting,
  isConnected,
  isConnectBarOpened: isConnectBarOpenedControlled,
  isStatisticsBarOpened: isStatisticsBarOpenedControlled,
  injectedProviderType,
  account,
  nickname,
  statisticsAccount,
  statisticsNickname,
  balance,
  currency,
  chainName,
  connectors,
  activeNavigationItem,
  statistics,
  featureToggles,
  featureTogglesTitle,
  networkStatus,
  onNetworkStatusClick,
  onConnectClick,
  onDisconnectClick,
  onNicknameChanged,
  onConnectorClick,
  onProfileClick,
  onProfileIconClick,
  onStatisticsBarCloseClick,
  onConnectBarCloseClick,
  onCurrencyChanged,
  onSupportClick,
  content,
  children,
}) => {
  const isConnectBarContolled = isConnectBarOpenedControlled !== undefined
  const isStatisticsBarContolled = isStatisticsBarOpenedControlled !== undefined

  const [isConnectBarOpened, setConnectBarOpened] = useState(false)
  const [isStatisticsBarOpened, setStatisticsBarOpened] = useState(false)

  const openConnectBar = useCallback(() => setConnectBarOpened(true), [])
  const closeConnectBar = useCallback(() => setConnectBarOpened(false), [])

  const handleConnectClick = useCallback(() => {
    if (onConnectClick) onConnectClick()
    if (!isConnectBarContolled) openConnectBar()
  }, [isConnectBarContolled, openConnectBar, onConnectClick])

  const handleConnectorClick = useCallback((connectorId) => {
    if (onConnectorClick) onConnectorClick(connectorId)
    if (!isConnectBarContolled) closeConnectBar()
  }, [isConnectBarContolled, onConnectorClick, closeConnectBar])

  const handleConnectBarCloseClick = useCallback(() => {
    if (onConnectBarCloseClick) onConnectBarCloseClick()
    if (!isConnectBarContolled) closeConnectBar()
  }, [isConnectBarContolled, onConnectBarCloseClick, closeConnectBar])

  const handleCloseStatisticsBar = useCallback(() => {
    if (!isStatisticsBarContolled) setStatisticsBarOpened(false)
    if (onStatisticsBarCloseClick) onStatisticsBarCloseClick()
  }, [isStatisticsBarContolled, onStatisticsBarCloseClick])

  const handleProfileIconClick = useCallback(() => {
    if (!isStatisticsBarContolled) setStatisticsBarOpened(true)
    if (onProfileIconClick) onProfileIconClick()
  }, [isStatisticsBarContolled, onProfileIconClick])

  const handleDisconnectClick = useCallback(() => {
    if (!isStatisticsBarContolled) setStatisticsBarOpened(false)
    if (onDisconnectClick) onDisconnectClick()
  }, [isStatisticsBarContolled, onDisconnectClick])

  const handleNicknameChange = useCallback((e) => {
    if (onNicknameChanged) onNicknameChanged(e)
  }, [onNicknameChanged])

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

  return (
    <FeatureTogglesProvider toggles={featureToggles}>
      <PMGlobalHeaderProvider
        currencyFill={currencyFill}
        openAuthModal={openAuthModal}
        closeAuthModal={closeAuthModal}
        maximumFractionDigits={maximumFractionDigits}
        maximumFractionDigitsPrecent={maximumFractionDigitsPrecent}
      >
        <Navbar
          basepath={basepath}
          logoFill={logoFill}
          logoLabelFill={logoLabelFill}
          active={activeNavigationItem}
          featureTogglesTitle={featureTogglesTitle}
          networkStatus={networkStatus}
          onNetworkStatusClick={onNetworkStatusClick}
          onSupportClick={onSupportClick}
        />
        <Header className={headerClassName}>
          {content}
          {isConnected ? (
            <ProfileBar
              className={profileBarClassName}
              innerClassName={profileBarInnerClassName}
              balance={balance}
              currency={currency}
              account={account}
              nickname={nickname}
              chainName={chainName}
              onDisconnectClick={onDisconnectClick}
              onClick={onProfileClick}
              onIconClick={handleProfileIconClick}
              onCurrencyChanged={onCurrencyChanged}
            />
          ) : (
            <Connect
              className={connectClassName}
              isConnecting={isConnecting}
              onClick={handleConnectClick}
            />
          )}
        </Header>
        <ConnectBar
          isOpened={isConnectBarContolled ? isConnectBarOpenedControlled : isConnectBarOpened}
          connectors={connectors}
          onCloseClick={handleConnectBarCloseClick}
          onConnectorClick={handleConnectorClick}
          injectedProviderType={injectedProviderType}
        />
        <StatisticsBar
          address={statisticsAccount}
          username={statisticsNickname}
          isSelfView={isConnected && (account === statisticsAccount)}
          isOpened={isStatisticsBarContolled ? isStatisticsBarOpenedControlled : isStatisticsBarOpened}
          statistics={statistics}
          isConnected={isConnected}
          onCloseClick={handleCloseStatisticsBar}
          onDisconnectClick={handleDisconnectClick}
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
  connectClassName: PropTypes.string,
  profileBarClassName: PropTypes.string,
  profileBarInnerClassName: PropTypes.string,
  basepath: PropTypes.string,
  logoFill: PropTypes.string,
  logoLabelFill: PropTypes.string,
  currencyFill: PropTypes.string,
  maximumFractionDigits: PropTypes.number,
  maximumFractionDigitsPrecent: PropTypes.number,
  mustUserLogin: PropTypes.bool,
  isConnecting: PropTypes.bool,
  isConnected: PropTypes.bool,
  isConnectBarOpened: PropTypes.bool,
  isStatisticsBarOpened: PropTypes.bool,
  injectedProviderType: PropTypes.string,
  account: PropTypes.string,
  nickname: PropTypes.string,
  statisticsAccount: PropTypes.string,
  statisticsNickname: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  chainName: PropTypes.string,
  connectors: PropTypes.array,
  activeNavigationItem: PropTypes.string,
  statistics: PropTypes.object,
  featureToggles: PropTypes.object,
  featureTogglesTitle: PropTypes.string,
  networkStatus: PropTypes.string,
  onNetworkStatusClick: PropTypes.func,
  onConnectClick: PropTypes.func,
  onDisconnectClick: PropTypes.func,
  onConnectorClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  onProfileIconClick: PropTypes.func,
  onConnectBarCloseClick: PropTypes.func,
  onNicknameChanged: PropTypes.func,
  onStatisticsBarCloseClick: PropTypes.func,
  onSupportClick: PropTypes.func,
  content: PropTypes.node,
  children: PropTypes.node,
}

export default React.memo(PMGlobalHeader)
