import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import cn from 'clsx'

import { NETWORK_STATUS } from '@constants'

import Sync from '../SVG/Sync'

import css from './NetworkStatus.module.scss'

const statuses = {
  success: 'Online',
  warning: 'Lag',
  error: 'Error',
}

const defaultPopperOffset = [45, 5]

const NetworkStatus = ({
  className,
  networkStatus,
  popperOffset = defaultPopperOffset,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const modifiers = useMemo(() => [
    {
      name: 'toggle',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        state.styles.popper.visibility = isOpen ? 'visible' : 'hidden'
        state.styles.popper.pointerEvents = isOpen ? 'all' : 'none'
      },
    },
    { name: 'offset', options: { offset: popperOffset } },
  ], [isOpen, popperOffset])

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    { modifiers, placement: 'top' },
  )

  const handleMouseEnter = useCallback(() => setIsOpen(true), [])
  const handleMouseLeave = useCallback(() => setIsOpen(false), [])
  const handleClick = useCallback(() => onClick && onClick(), [onClick])

  return (
    <div className={cn(css.container, {
      [css.success]: networkStatus === NETWORK_STATUS.SUCCESS,
      [css.warning]: networkStatus === NETWORK_STATUS.WARNING,
      [css.error]: networkStatus === NETWORK_STATUS.ERROR,
    }, className)}>
      <div
        ref={setReferenceElement}
        className={css.header}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={css.status} />
        <Sync />
      </div>
      {createPortal((
        <div className={css.popper} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          Network Sync
          <span
            className={cn(css.title, {
              [css.success]: networkStatus === NETWORK_STATUS.SUCCESS,
              [css.warning]: networkStatus === NETWORK_STATUS.WARNING,
              [css.error]: networkStatus === NETWORK_STATUS.ERROR,
            })}>
            {statuses[networkStatus] || statuses.success}
          </span>
        </div>
      ), document.body)}
    </div>
  )
}

NetworkStatus.propTypes = {
  className: PropTypes.string,
  networkStatus: PropTypes.string,
  popperOffset: PropTypes.array,
  onClick: PropTypes.func,
}

export default NetworkStatus
