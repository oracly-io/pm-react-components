import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import cn from 'clsx'
import { usePopper } from 'react-popper'

import DropdownIcon from '../../SVG/DropdownIcon'

import DropdownOption from './DropdownOption'
import { getModifiers } from './Dropdown.utils'

import css from './Dropdown.module.scss'

const defaultOptionRenderer = (value) => value.label
const defaultValueRenderer = (value) => value.label
const defaultCheckOptionSelected = (value, option) => value === option

const Dropdown = ({
  containerClassName,
  headerClassName,
  iconClassName,
  bodyClassName,
  valueClassName,
  optionClassName,
  selectedOptionClassName,
  placeholder,
  iconColor,
  options,
  value,
  popperStyles,
  popperModifiers,
  showIcon = true,
  targetBody = false,
  disabled,
  onChange,
  valueRenderer = defaultValueRenderer,
  optionRenderer = defaultOptionRenderer,
  checkOptionSelected = defaultCheckOptionSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerElement = useRef(null)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const modifiers = useMemo(() => [
    ...getModifiers({ isOpen, popperStyles }),
    ...(popperModifiers || [])
  ], [isOpen, popperStyles, popperModifiers])
  const { styles, attributes } = usePopper(referenceElement, popperElement, { modifiers, placement: 'bottom' })

  const handleClick = useCallback(() => {
    if (disabled) return
    setIsOpen((isOpen) => !isOpen)
  }, [disabled])

  const handleChange = useCallback((option) => {
    if (disabled) return
    setIsOpen(false)
    onChange && onChange(option)
  }, [disabled, onChange])

  useEffect(() => {
    const handler = (e) => {
      if (containerElement.current && !containerElement.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [])

  const renderPopper = () => (
    <div className={cn(css.body, bodyClassName)} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {options.map((option, index) => {
        const selected = checkOptionSelected(value, option)
        return (
          <DropdownOption
            key={index}
            className={cn(optionClassName, { [selectedOptionClassName]: selected })}
            option={option}
            selected={selected}
            onClick={handleChange}
            renderer={optionRenderer}
          />
        )
      })}
    </div>
  )

  return (
    <div ref={containerElement} className={cn(css.container, containerClassName)}>
      <div className={cn(css.header, headerClassName)} ref={setReferenceElement} onClick={handleClick}>
        <div className={cn(css.value, valueClassName)}>{value && valueRenderer(value) || placeholder}</div>
        {showIcon && <div className={cn(css.icon, iconClassName)}><DropdownIcon fill={iconColor} /></div>}
      </div>

      {targetBody ? createPortal(renderPopper(), document.body) : renderPopper()}
    </div>
  )
}

Dropdown.propTypes = {
  containerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  optionClassName: PropTypes.string,
  selectedOptionClassName: PropTypes.string,
  placeholder: PropTypes.node,
  iconColor: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  popperStyles: PropTypes.object,
  popperModifiers: PropTypes.array,
  showIcon: PropTypes.bool,
  targetBody: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  valueRenderer: PropTypes.func,
  optionRenderer: PropTypes.func,
  checkOptionSelected: PropTypes.func,
}

export default React.memo(Dropdown)