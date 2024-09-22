import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { TokenCurrencyCell, DateCell, CurrencyCell, PercentCell } from '../cells'
import TabContent from '../TabContent'

const cellRenderers = {
  stats: (row) => {
    if (row.name === 'staked') {
      return (
        <CurrencyCell
          amount={row.value.amount}
          currency={row.value.currency}
          convertedAmount={row.value.convertedAmount}
          convertedCurrency={row.value.convertedCurrency}
          hideConverted={!Number(row.value.convertedAmount)}
        />
      )
    }
    if (row.name === 'voting') {
      return <PercentCell value={row.value} />
    }
    if (row.name === 'joined') {
      return <DateCell date={row.value} />
    }

    if (row.name === 'last activity') {
      return <DateCell date={row.value} />
    }
  },
  claimed: (row) => (
    <TokenCurrencyCell
      amount={row.value.amount}
      currency={row.value.currency}
    />
  ),
}

const statsOrder = ['staked', 'voting', 'joined', 'last activity']

const StakerTabContent = ({ achievements, stats, tokenStats, isLoading }) => {
  const statsColumns = useMemo(() => [
    { dataKey: 'name' },
    { cellRenderer: cellRenderers.stats },
  ], [])
  const tokenStatsColumns = useMemo(() => [
    { label: 'Name', dataKey: 'name' },
    { label: 'Claimed', cellRenderer: cellRenderers.claimed },
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

StakerTabContent.propTypes = {
  achievements: PropTypes.array,
  stats: PropTypes.object,
  tokenStats: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default StakerTabContent