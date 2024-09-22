import React, { useCallback, useEffect, useRef, useState } from 'react'

import cn from 'clsx'
import PropTypes from 'prop-types'
import { isPositive, isNegative, sub } from '@oracly/pm-libs/calc-utils'
import { htmlAddress, htmlCurrency } from '@oracly/pm-libs/html-utils'

import BalanceCurrency from '../common/BalanceCurrency'
import Spinner from '../common/Spinner'
import AccountIcon from '../AccountIcon'
import { useGHProvider } from '../PMGlobalHeaderProvider'
import DropdownIcon from '../SVG/DropdownIcon'

import css from './ProfileBar.module.scss'

const options = [
  { label: 'USD Coin', currency: 'USDC' },
  { label: 'Oracly', currency: 'DEMO' },
]

const useChangeERC20 = (account, number, currency) => {
  const prevNumberRef = useRef(number)
  const prevCurrencyRef = useRef(currency)
  const prevAccountRef = useRef(account)

  const [state, setState] = useState({ diff: 0, changeid: 0 })

  useEffect(() => {
    const prevNumber = prevNumberRef.current
    const prevCurrency = prevCurrencyRef.current
    const prevAccount = prevAccountRef.current

    if (
        prevNumber !== number &&
        prevCurrency === currency &&
        prevAccount === account
    ){
      setState({ diff: sub(number, prevNumber), changeid: state.changeid+1 })
    }

    prevNumberRef.current = number
    prevCurrencyRef.current = currency
    prevAccountRef.current = account

  }, [number, currency, account])

  return [state.diff, state.changeid]
}

const ProfileBar = ({
  className,
  innerClassName,
  currency,
  balance,
  account,
  nickname,
  chainName,
  onClick,
  onCurrencyChanged,
  onIconClick,
}) => {
  const { currencyFill, maximumFractionDigits } = useGHProvider()

  const [difference, changeid] = useChangeERC20(account, balance, currency)

  const handleClick = useCallback(() => {
    if (onClick) onClick(account.toLowerCase())
  }, [onClick, account])

  const handleIconClick = useCallback((e) => {
    e.stopPropagation()
    if (onIconClick) onIconClick(account.toLowerCase())
  }, [onIconClick, account])

  const [popoverPop, setPopoverPop] = useState(false)
  const handleBalanceClick = useCallback((e) => {
    e.stopPropagation()
    setPopoverPop(!popoverPop)
  }, [popoverPop])

  const handleCurrencyChanged = useCallback((e) => {
    e.stopPropagation()
    const newcurrency = e?.target?.dataset?.currency
    if (newcurrency !== currency && onCurrencyChanged) {
      setPopoverPop(false)
      onCurrencyChanged(newcurrency)
    }
  }, [currency, onCurrencyChanged])

  const popover = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      if (popover.current && !popover.current.contains(e.target)) {
        setPopoverPop(false)
      }
    }
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [])

  let htmldifference = htmlCurrency(difference, maximumFractionDigits)
  if (htmldifference.includes('<-')) htmldifference = `-<${htmldifference.slice(2)}`

  return (
    <div className={cn(css.profilebar, className)} onClick={handleClick}>
      <div className={cn(css.inner, innerClassName)}>

        <div
          key={changeid}
          className={cn(css.cash, {
            [css.increase]: difference && isPositive(difference),
            [css.decrease]: difference && isNegative(difference),
          })}
          onClick={handleBalanceClick}
        >

          <BalanceCurrency fill={currencyFill} currency={currency} />
          {balance && balance !== 0 ? (
            <span className={css.value}>{htmlCurrency(balance, maximumFractionDigits)}</span>
          ) : (
            <Spinner className={css.spinner} />
          )}
          <span className={css.dropdownIcon}><DropdownIcon /></span>
          <span className={css.difference}>
            <span>+</span>
            {htmldifference}
          </span>
          {popoverPop &&
          <div ref={popover} className={css.popover}>
            {options.map((option, idx) => (

              <div
                key={idx}
                className={cn(css.option, { [css.active]: option.currency === currency })}
                data-currency={option.currency}
                onClick={handleCurrencyChanged}
              >
                <span className={css.optionIcon}>
                  <BalanceCurrency fill={currencyFill} currency={option.currency} className={css.optionBalance} />
                </span>
                <span className={css.optionLabel}>{option.label}</span>
                <span className={css.optionCurrency}>{`(${option.currency})`}</span>
              </div>

            ))}
          </div>
          }
        </div>
        <div className={css.account}>
          <div className={css.wallet} title={nickname}>{nickname || htmlAddress(account)}</div>
          <div className={css.name}>{chainName}</div>
        </div>
        <AccountIcon
          className={css.action}
          account={account}
          onClick={handleIconClick}
        />
      </div>
    </div>
  )
}

ProfileBar.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  account: PropTypes.string,
  nickname: PropTypes.string,
  chainName: PropTypes.string,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
  onCurrencyChanged: PropTypes.func,
}

export default React.memo(ProfileBar)
