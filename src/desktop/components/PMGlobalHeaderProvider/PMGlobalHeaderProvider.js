import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import PMGlobalHeaderProviderContext from './PMGlobalHeaderProviderContext';

const PMGlobalHeaderProvider = ({
  currencyFill,
  children,
  openAuthModal,
  closeAuthModal,
  maximumFractionDigits,
  maximumFractionDigitsPrecent,
}) => {

  const value = useMemo(
    () => ({
      currencyFill,
      openAuthModal,
      closeAuthModal,
      maximumFractionDigits,
      maximumFractionDigitsPrecent,
    }),
    [
      currencyFill,
      openAuthModal,
      closeAuthModal,
      maximumFractionDigits,
      maximumFractionDigitsPrecent,
    ]
  );

  return (
    <PMGlobalHeaderProviderContext.Provider value={value}>
      {children}
    </PMGlobalHeaderProviderContext.Provider>
  )
}

PMGlobalHeaderProvider.propTypes = {
  currencyFill: PropTypes.string,
  openAuthModal: PropTypes.func,
  closeAuthModal: PropTypes.func,
  maximumFractionDigits: PropTypes.number,
  maximumFractionDigitsPrecent: PropTypes.number,
}

export default PMGlobalHeaderProvider