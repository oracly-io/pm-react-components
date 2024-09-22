import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import Spinner from '../../common/Spinner'

import css from './Table.module.scss'

const Table = ({
  className,
  tdClassName,
  title,
  columns,
  rows,
  isLoading,
}) => {
  const shouldRenderTHead = !!(columns.filter(({ label }) => label).length)

  const renderRow = (row) => {
    return columns.map((column, i) => {
      const { dataKey, cellRenderer = (row) => row[dataKey]} = column
      return (
        <div className={cn(css.td, tdClassName)} key={i} data-column={i}>
          {cellRenderer(row)}
        </div>
      )
    })
  }

  const renderColumns = () =>
    columns.map(({label}, i) => (
      <div className={css.th} key={i}>
        {label}
      </div>
    ))

  const scssVars = useMemo(() => ({ "--columsSize": columns.length }), [columns.length])
  const noData = !rows.length

  return (
    <div className={cn(css.container, className)}>
      <div className={css.title}>{title}</div>
      <div className={css.table} style={scssVars}>
        {shouldRenderTHead && (
          <>
            <div className={css.headbg} />
            <div className={css.line} />
            {renderColumns()}
          </>
        )}
        <span />
        {isLoading ? (
          <Spinner className={css.spinner} />
        ) : noData ? (
          <div className={css.nodata}>{`No ${title.toLowerCase()} yet`}</div>
        ) : rows.map((row, i) => (
          <Fragment key={i}>
            {!!i && <div className={css.line} />}
            {renderRow(row)}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

Table.propTypes = {
  className: PropTypes.string,
  tdClassName: PropTypes.string,
  title: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array,
  isLoading: PropTypes.bool,
}

export default React.memo(Table)