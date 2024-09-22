import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { TokenCurrencyCell, DateCell } from '../cells'
import { FormattedCurrencyCell } from '../cells'
import TabContent from '../TabContent'

const cellRenderers = {
  stats: (row) => {
    if (row.name === 'predictions') {
      return row.value
    }
    if (row.name === 'wagered') {
      return (
        <FormattedCurrencyCell
          amount={row.value.convertedAmount}
          currency={row.value.convertedCurrency}
        />
      )
    }
    if (row.name === 'earned') {
      return (
        <FormattedCurrencyCell
          amount={row.value.convertedAmount}
          currency={row.value.convertedCurrency}
        />
      )
    }
    if (row.name === 'joined') {
      return <DateCell date={row.value} />
    }
    if (row.name === 'last activity') {
      return <DateCell date={row.value} />
    }
  },
  wagered: (row) => (
    <TokenCurrencyCell
      amount={row.value?.wagered?.amount}
      currency={row.value?.wagered?.currency}
    />
  ),
  earned: (row) => (
    <TokenCurrencyCell
      amount={row.value?.earned?.amount}
      currency={row.value?.earned?.currency || row.value?.wagered?.currency}
    />
  ),
}

const statsOrder = ['predictions', 'wagered', 'earned', 'joined', 'last activity']

const PredictorTabContent = ({ achievements, stats, tokenStats, isLoading }) => {
  const statsColumns = useMemo(() => [
    { dataKey: 'name' },
    { cellRenderer: cellRenderers.stats },
  ], [])
  const tokenStatsColumns = useMemo(() => [
    { label: 'Name', dataKey: 'name' },
    { label: 'Wagered', cellRenderer: cellRenderers.wagered },
    { label: 'Earned', cellRenderer: cellRenderers.earned },
  ], [])

  return (
    <TabContent
      achievements={achievements}
      stats={stats}
      statsOrder={statsOrder}
      statsColumns={statsColumns}
      tokenStats={tokenStats}
      tokenStatsColumns={tokenStatsColumns}
      isLoading={isLoading}
    />
  )
}

PredictorTabContent.propTypes = {
  achievements: PropTypes.array,
  stats: PropTypes.object,
  tokenStats: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default PredictorTabContent