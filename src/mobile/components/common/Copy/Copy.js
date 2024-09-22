import React, { useCallback, useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import cn from 'clsx'
import { usePopper } from 'react-popper'

import CopyIcon from '../../SVG/CopyIcon'

import css from './Copy.module.scss'

const Copy = ({
  className,
  iconClassName,
  children,
  text,
  offsetX = 0,
  offsetY = 10,
  target,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)

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
    { name: 'arrow', options: { element: arrowElement } },
    { name: 'offset', options: { offset: [offsetX, offsetY] } },
  ], [isOpen, offsetX, offsetY, arrowElement])

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers,
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setIsOpen(true)
  }, [text])

  useEffect(() => {
    let timeoutid
    if (isOpen) timeoutid = setTimeout(() => setIsOpen(false), 1000)
    return () => clearTimeout(timeoutid)
  }, [isOpen])

  const renderPopper = () => (
    <div className={css.popper} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      Copied to clipboard!
      <div className={css.arrow} ref={setArrowElement} style={styles.arrow} />
    </div>
  )

  return (
    <>
      <span className={cn(css.container, className)}>
        {children}
        <span
          ref={setReferenceElement}
          className={cn(css.icon, iconClassName)}
          onClick={handleClick}
        >
          <CopyIcon />
        </span>
      </span>
      {target ? createPortal(renderPopper(), target) : renderPopper()}
    </>
  )
}

Copy.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  target: PropTypes.instanceOf(Element),
}

export default Copy