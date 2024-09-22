import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import Avatar from '../common/Avatar'
import CashDropdown from './CashDropdown'
import NetworkStatus from './NetworkStatus'

import css from './ProfileBar.module.scss'

const ProfileBar = ({
  className,
  currency,
  balance,
  account,
  networkStatus,
  cashDropdownPopperStyles,
  onCurrencyChanged,
  onIconClick,
}) => {

  const handleIconClick = useCallback((e) => {
    e.stopPropagation()
    if (onIconClick) onIconClick(account.toLowerCase())
  }, [onIconClick, account])

  return (
    <div className={cn(css.container, className)}>
      <CashDropdown
        className={css.cash}
        currency={currency}
        balance={balance}
        account={account}
        onCurrencyChanged={onCurrencyChanged}
        dropdownPopperStyles={cashDropdownPopperStyles}
      />
      <div className={css.avatarContainer}>
        <Avatar
          className={css.avatar}
          account={account}
          onClick={handleIconClick}
        />
        {networkStatus && <NetworkStatus type={networkStatus} />}
      </div>
    </div>
  )
}

ProfileBar.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  account: PropTypes.string,
  networkStatus: PropTypes.string,
  cashDropdownPopperStyles: PropTypes.object,
  onCurrencyChanged: PropTypes.func,
  onIconClick: PropTypes.func,
}

export default ProfileBar
