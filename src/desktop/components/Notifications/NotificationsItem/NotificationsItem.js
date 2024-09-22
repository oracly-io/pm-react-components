import React from 'react'
import PropTypes from 'prop-types'
import cn from 'clsx'
import { noop } from 'lodash'

import css from './NotificationsItem.module.scss'

const NotificationsItem = ({ className, icon, message, action, onClick = noop }) => {
  return (
    <div className={cn(css.container, className)}>
      {icon && <div className={css.icon}>{icon}</div>}
      <div className={css.message}>{message}</div>
      <div className={css.action} onClick={onClick}>{action}</div>
    </div>
  )
}

NotificationsItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  message: PropTypes.string,
  action: PropTypes.node,
  onClick: PropTypes.func,
}

export default NotificationsItem
