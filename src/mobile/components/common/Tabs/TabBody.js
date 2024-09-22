import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { TabContext } from './Tabs';

const TabBody = ({ children }) => {
  const [tabIndex, setTabIndex] = useState()
  const { tab, registerBody } = useContext(TabContext);
  useEffect(() => setTabIndex(registerBody()), [])

  if (tab !== tabIndex) return null

  return children
}

TabBody.propTypes = {
  children: PropTypes.node
}

export default React.memo(TabBody)