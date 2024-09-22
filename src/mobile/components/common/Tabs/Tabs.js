import React, { createContext, useCallback, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

export const TabContext = createContext({});

const Tabs = ({
  className,
  activeTabClassName,
  tab: controlledTab,
  onTabChange,
  initialTab = 0,
  children,
}) => {
  const isTabControlled = controlledTab !== undefined

  const [tab, setTab] = useState(initialTab)
  const [renderTab, setRenderTab] = useState(false)
  const tabsRef = useRef([])

  const handleSetTab = useCallback((tab) => {
    if (!isTabControlled) setTab(tab)
    if (onTabChange) onTabChange(tab)
  }, [isTabControlled])

  const registerHead = useCallback(() => {
    const tabIndex = tabsRef.current.push(1) - 1
    setRenderTab(tabsRef.current.length > 1)
    return tabIndex
  }, [])

  const registerBody = useCallback(() => {
    const tabIndex = tabsRef.current.findIndex((value) => value === 1)
    tabsRef.current[tabIndex] = 0
    return tabIndex
  }, [])

  const value = useMemo(() => {
    return {
      activeTabClassName,
      tab: isTabControlled ? controlledTab : tab,
      renderTab,
      setTab: handleSetTab,
      registerHead,
      registerBody,
    }
  }, [isTabControlled, tab, controlledTab, renderTab])

  return (
    <TabContext.Provider value={value}>
      <div className={className}>
        {children}
      </div>
    </TabContext.Provider>
  )
}

Tabs.propTypes = {
  className: PropTypes.string,
  activeTabClassName: PropTypes.string,
  tab: PropTypes.string,
  onTabChange: PropTypes.func,
  initialTab: PropTypes.number,
  children: PropTypes.node,
}

export default React.memo(Tabs)