import PropTypes from 'prop-types'
import { htmlPercent } from '@oracly/pm-libs/html-utils'

import { useGHProvider } from '../../../PMGlobalHeaderProvider'

const PercentCell = ({ value }) => {
  const { maximumFractionDigitsPrecent } = useGHProvider()

  return htmlPercent(value, maximumFractionDigitsPrecent)
}

PercentCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default PercentCell