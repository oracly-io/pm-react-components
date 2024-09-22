import PropTypes from 'prop-types'
import { div } from '@oracly/pm-libs/calc-utils'
import { htmlCurrency } from '@oracly/pm-libs/html-utils'

import { useGHProvider } from '../../../PMGlobalHeaderProvider'

const formatSymboled = (amount, currency) => {
  const formater = new Intl.NumberFormat(Intl.Locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return formater.format(amount)
}

function formatNumber(num = 0, currency, token, maximumFractionDigits) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  let formatted = num

  const found = map.find((x) => Math.abs(num) >= x.threshold)
  if (found) formatted = div(num, found.threshold)
  if (!token && currency) formatted = formatSymboled(formatted, currency)
  if (token) formatted = htmlCurrency(formatted, maximumFractionDigits)
  if (found) formatted = formatted + found.suffix

  return formatted
}

const FormattedCurrencyCell = ({ amount, currency, token }) => {
  const { maximumFractionDigits } = useGHProvider()

  return formatNumber(amount, currency, token, maximumFractionDigits)
}

FormattedCurrencyCell.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  token: PropTypes.bool,
}

export default FormattedCurrencyCell