import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import { factoryFunds } from '../../SVG/currency/funds'

import css from './BalanceCurrency.module.scss'

const BalanceCurrency = ({ className, currency, fill, size }) => {

  const Currency = factoryFunds(currency)

  return (
    <div className={cn(css.balance, className)}>
      <Currency fill={fill} size={size} />
    </div>
  )

}

BalanceCurrency.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.number
}

export default React.memo(BalanceCurrency)
