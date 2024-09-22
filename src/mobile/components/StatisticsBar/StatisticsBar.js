import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'
import { htmlAddress } from '@oracly/pm-libs/html-utils'

import ArrowForward from '../SVG/ArrowForward'
import SupportIcon from '../SVG/SupportIcon'
import Disconnect from '../SVG/Disconnect'
import Copy from '../common/Copy'
import { Tabs, Tab, TabBody } from '../common/Tabs'
import Avatar from '../common/Avatar'
import { useTransition } from '../../../hooks/useTransition'
import PredictorTabContent from './PredictorTabContent'
import MentorTabContent from './MentorTabContent'
import StakerTabContent from './StakerTabContent'
import InvitationLink from './InvitationLink'
import AppsMenu from './AppsMenu'
import AppInstallButton from './AppInstallButton/AppInstallButton'
import Nickname from './Nickname'

import css from './StatisticsBar.module.scss'
import AnimatedButton from '../common/AnimatedButton'

const StatisticsBar = ({
  isOpened,
  address,
  username,
  isSelfView,
  statistics,
  activeNavigationItem,
  showInstallApp,
  onCloseClick,
  onDisconnectClick,
  onInstallAppClick,
  onSupportClick,
  onNicknameChanged,
}) => {
  const timeout = 100 //ms
  const [mount, opening] = useTransition(isOpened && !!address, timeout)

  useEffect(() => {
    if (isOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'visible'
  }, [isOpened])

  const stopPropagation = useCallback((e) => e.stopPropagation(), [])

  if (!mount) return null

  return (
    <div className={cn(css.overflow, { [css.opened]: opening })} onClick={onCloseClick}>
      <div className={css.container} onClick={stopPropagation}>

        <div className={css.top}>
          <a
            className={cn(
              css.action,
              { [css.hidden]: !isSelfView }
            )}
            onClick={onSupportClick}
          >
            <SupportIcon/>
          </a>
          <div className={css.account}>
            <Avatar className={css.icon} account={address} />

            <Nickname
              address={address}
              username={username}
              editable={isSelfView}
              onNicknameChanged={onNicknameChanged}
            />
            <Copy
              text={address}
              className={css.address}
              iconClassName={css.copyIcon}
            >
              {htmlAddress(address)}
            </Copy>
          </div>
          <a
            title={'Close bar'}
            className={css.action}
            onClick={onCloseClick}
          >
            <ArrowForward />
          </a>
        </div>

        <div className={css.content}>

          <Tabs className={css.tabs} activeTabClassName={css.activeTab}>
            <div className={css.head}>
              {statistics?.predictor && <Tab>Predictor</Tab>}
              {statistics?.mentor && <Tab>Mentor</Tab>}
              {statistics?.staker && <Tab>Staker</Tab>}
            </div>
            {isSelfView && showInstallApp && <AppInstallButton onClick={onInstallAppClick} />}
            <TabBody>
              <PredictorTabContent
                stats={statistics?.predictor?.stats}
                tokenStats={statistics?.predictor?.tokenStats}
                isLoading={statistics?.predictor?.isLoading}
              />
            </TabBody>
            <TabBody>
              <MentorTabContent
                stats={statistics?.mentor?.stats}
                tokenStats={statistics?.mentor?.tokenStats}
                isLoading={statistics?.mentor?.isLoading}
              />
            </TabBody>
            <TabBody>
              <StakerTabContent
                stats={statistics?.staker?.stats}
                tokenStats={statistics?.staker?.tokenStats}
                isLoading={statistics?.staker?.isLoading}
              />
            </TabBody>
          </Tabs>

          {isSelfView && <AppsMenu active={activeNavigationItem} />}

          {isSelfView && <InvitationLink address={address} />}

          {isSelfView && (
            <AnimatedButton
              className={css.disconnect}
              onClick={onDisconnectClick}
              borderWidth="1px"
            >
              <Disconnect/>
              <span>Untie wallet</span>
            </AnimatedButton>
          )}

        </div>

      </div>
    </div>
  )
}

StatisticsBar.propTypes = {
  isOpened: PropTypes.bool,
  address: PropTypes.string,
  isSelfView: PropTypes.bool,
  showInstallApp: PropTypes.bool,
  statistics: PropTypes.object,
  onCloseClick: PropTypes.func,
  onConnectorClick: PropTypes.func,
  onInstallAppClick: PropTypes.func,
  onSupportClick: PropTypes.func,
}

export default React.memo(StatisticsBar)
