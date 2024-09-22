import React from 'react'

const withDevelopmentOnly = (Cmp) => {
  return (props) => {
    const isDevelopment = true
    if (!isDevelopment) return null

    return <Cmp {...props} />
  }  
}

export default withDevelopmentOnly