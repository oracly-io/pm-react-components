import React, { useCallback, useState } from 'react'
import cn from 'clsx'
import PropTypes from 'prop-types'
import config from '../../../config'
import { useTransition } from '../../../hooks/useTransition'
import { FeatureToggle } from '../FeatureToggle';
import NetworkStatus from '../NetworkStatus'
import Button from '../common/Button'
import LogoIcon from '../SVG/Logo'
import TradeIcon from '../SVG/Trade'
import StakingIcon from '../SVG/Staking'
import MentoringIcon from '../SVG/Mentoring'
import LogoLabel from '../SVG/LogoLabel'

import css from './Navbar.module.scss'
import SupportIcon from '../SVG/SupportIcon'

const menuItems = [
  { name: 'trade', icon: <TradeIcon />, label: 'Trading', path: config.pm_base_path },
  { name: 'staking', icon: <StakingIcon />, label: 'Staking', path: config.st_base_path },
  { name: 'mentoring', icon: <MentoringIcon />, label: 'Mentoring', path: config.mt_base_path },
]

const localStorageSelector = 'pm-react-components-menu-expanded'

const NavBar = ({
  basepath,
  logoFill,
  logoLabelFill,
  active,
  featureTogglesTitle,
  networkStatus,
  onNetworkStatusClick,
  onSupportClick,
}) => {

  const [expanded, setExpanded] = useState(localStorage.getItem(localStorageSelector) === 'true')

  const timeout = 100 //ms
  const [mount, opening] = useTransition(expanded, timeout)

  const toggleNavbar = useCallback(() => {
    setExpanded((expanded) => {
      localStorage.setItem(localStorageSelector, !expanded)
      return !expanded
    })
  }, [])

  const handleMenuItemClick = useCallback((e) => {
    if (e.currentTarget.hasAttribute('data-active')) {
      e.preventDefault()
      toggleNavbar()
    }
  }, [toggleNavbar])

  return (
    <div className={cn(css.container, { [css.expanded]: mount && opening })}>
      <div className={css.navbar}>
        <a href={basepath} className={css.logo} tabIndex={-1}>
          <span className={css.logoIcon}>
            <LogoIcon fill={logoFill} />
          </span>
          <LogoLabel fill={logoLabelFill} />
        </a>
        <div className={css.menu}>
          {menuItems.map(({ name, label, icon, path }) => (
            <a
              key={name}
              href={path}
              className={css.menuItem}
              onClick={handleMenuItemClick}
              {...(active === name ? {'data-active': ''} : {})}
            >
              <span className={css.icon}>{icon}</span>
              <span className={css.label}>{label}</span>
            </a>
          ))}
          <div className={css.bottomGrid}>
            <Button className={css.supportButton} onClick={onSupportClick}>
              <SupportIcon />
            </Button>
            {networkStatus && (
              <NetworkStatus
                onClick={onNetworkStatusClick}
                networkStatus={networkStatus}
              />
            )}
            <FeatureToggle title={featureTogglesTitle} />
          </div>
        </div>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  basepath: PropTypes.string,
  active: PropTypes.string,
  logoFill: PropTypes.string,
  logoLabelFill: PropTypes.string,
  featureTogglesTitle: PropTypes.string,
  networkStatus: PropTypes.string,
  onNetworkStatusClick: PropTypes.func,
  onSupportClick: PropTypes.func,
}

export default React.memo(NavBar)
