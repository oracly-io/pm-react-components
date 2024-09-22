import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { pickBy, startsWith, mapKeys, kebabCase } from 'lodash'
import cn from 'clsx'

import css from './AnimatedButton.module.scss'

const AnimatedButton = (props) => {

  const button = useRef()

  const move = useCallback(e => {
    window.requestAnimationFrame(() => {
      if (!button.current) return
      if (!e) return
      if (props.disabled) return

      const rect = button.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      button.current.style.setProperty('--hover-after-left', `${x}px`)
      button.current.style.setProperty('--hover-after-top', `${y}px`)
      button.current.style.setProperty('--hover-before-left', `${x}px`)
      button.current.style.setProperty('--hover-before-top', `${y}px`)

    })

    if (props.onMouseMove) props.onMouseMove(e)

  }, [
    props.hoverCircleOpacity,
    props.hoverBorderOpacity,
    props.hoverButtonOpacity,
    props.activeInnerCircle,
    props.activeBorderCircle,
    props.shadowColor,
    props.hoverColor,
    props.onMouseMove,
    props.disabled,
  ])

  const reactattrs = pickBy(props, (v, key) => startsWith(key, 'data'))
  const htmlattrs = mapKeys(reactattrs, (v, key) => kebabCase(key))

  const handleClick = useCallback((e) => {
    !props.disabled && props.onClick && props.onClick(e)
  }, [props.onClick, props.disabled])

  const style = {
    '--hover-focus-inner-circle': props.hoverCircleOpacity,
    '--hover-focus-border-circle': props.hoverBorderOpacity,
    '--hover-focus-button': props.hoverButtonOpacity,
    '--active-inner-circle': props.activeInnerCircle,
    '--active-border-circle': props.activeBorderCircle,
    '--hover-box-shadow-color': props.shadowColor,
    '--hover-color': props.hoverColor,
    '--border-width': props.borderWidth,
  }

  return (
    <a
      ref={button}
      title={props.title}
      className={cn(css.button, { [css.disabled]: props.disabled }, props.className)}
      onClick={handleClick}
      href={props.href}
      onMouseMove={move}
      style={style}

      //pass data attributes
      {...htmlattrs}
    >
      {props.children}
      <span className={css.before}></span>
      <span className={css.overlay}></span>
      <span className={css.after}></span>
      <span className={css.content}>
        {props.children}
      </span>
    </a>
  )

}

AnimatedButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hoverCircleOpacity: PropTypes.number,
  hoverBorderOpacity: PropTypes.number,
  hoverButtonOpacity: PropTypes.number,
  activeInnerCircle: PropTypes.number,
  activeBorderCircle: PropTypes.number,
  shadowColor: PropTypes.string,
  hoverColor: PropTypes.string,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
}

export default React.memo(AnimatedButton)

