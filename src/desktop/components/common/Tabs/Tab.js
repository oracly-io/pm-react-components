import React, { useEffect, useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import { TabContext } from './Tabs';

import css from './Tabs.module.scss'

const Tab = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(null)
  const { activeTabClassName, tab, setTab, renderTab, registerHead } = useContext(TabContext);
  useEffect(() => setTabIndex(registerHead()), [])

  const handleTabClick = useCallback(() => setTab(tabIndex), [tabIndex])

  if (!renderTab) return null

  return (
    <div
      className={cn(css.container, { [activeTabClassName]: tabIndex === tab })}
      onClick={handleTabClick}
    >
      {children}
    </div>
  )
}

Tab.propTypes = {
  children: PropTypes.node,
}

export default React.memo(Tab)