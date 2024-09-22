import React from 'react'
import { map } from 'lodash'
import PropTypes from 'prop-types'

import Button from '../common/Button'
import CloseIcon from '../SVG/CloseIcon'
import FeatureToggleButton from './FeatureToggleButton'

import css from './FeatureTogglesModal.module.scss'

const FeatureTogglesModal = ({
  toggles,
  close,
  title,
}) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <span className={css.title}>{title}</span>
        <Button onClick={close} className={css.close}>
          <CloseIcon />
        </Button>
      </div>
      <ul className={css.list}>
        {map(toggles, (toggle, name) => {
          return (
            <li className={css.item} key={name}>
              <div className={css.left}>
                <span className={css.label}>{toggle.label}</span>
                {toggle.description && (
                  <div className={css.description}>
                    {toggle.description}
                  </div>
                )}
              </div>
              <div className={css.right}>
                <FeatureToggleButton
                  name={name}
                  toggledValue={toggle.toggledValue}
                  untoggledValue={toggle.untoggledValue}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

FeatureTogglesModal.propTypes = {
  toggles: PropTypes.object,
  close: PropTypes.func,
  title: PropTypes.string,
}

export default React.memo(FeatureTogglesModal)