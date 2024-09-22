import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'

import css from './NotificationsWidget.module.scss'

const NotificationsWidget = ({
  className,
  children,
}) => {
  return (
    <div className={cn(css.container, className)}>
      {children}
    </div>
  )
}

NotificationsWidget.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default NotificationsWidget