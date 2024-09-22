import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import BalanceCurrency from '../../../common/BalanceCurrency'
import FormattedCurrencyCell from '../FormattedCurrencyCell'
import { useGHProvider } from '../../../PMGlobalHeaderProvider'

import css from './TokenCurrencyCell.module.scss'

const TokenCurrencyCell = ({
  containerClassName,
  amountClassName,
  iconClassName,
  amount,
  currency,
  iconSize,
  placement = 'left',
}) => {
  const { currencyFill } = useGHProvider()

  return (
    <div className={cn(
      css.container,
      { [css.reverse]: placement === 'right' },
      containerClassName,
    )}>
      <BalanceCurrency
        fill={currencyFill}
        className={cn(
          css.icon,
          { [css.left]: placement === 'left', [css.right]: placement === 'right'},
          iconClassName,
        )}
        currency={currency}
        size={iconSize}
      />
      <span className={cn(css.amount, amountClassName)}>
        <FormattedCurrencyCell amount={amount} token />
      </span>
    </div>
  )
}

TokenCurrencyCell.propTypes = {
  containerClassName: PropTypes.string,
  amountClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  iconSize: PropTypes.number,
  placement: PropTypes.string,
}

export default TokenCurrencyCell