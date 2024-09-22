import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import TogglesIcon from '../SVG/Toggles'
import { useModal } from '../modals';
import Button from '../common/Button'

import FeatureTogglesModal from './FeatureTogglesModal'
import useFeatureToggles from '../../../features/useFeatureToggles'
import { withDevelopmentOnly } from '../../../hocs';

import css from './FeatureToggle.module.scss'

const FeatureToggle = ({ title }) => {
  const { toggles = {} } = useFeatureToggles()
  const { modal, open } = useModal({
    Content: FeatureTogglesModal,
    toggles,
    hideClose: true,
    title,
  })

  if (isEmpty(toggles)) return null

  return (
    <>
      <Button className={css.button} onClick={open}>
        <TogglesIcon />
      </Button>
      {modal}
    </>
  )
}

FeatureTogglesModal.propTypes = {
  title: PropTypes.string,
}

export default withDevelopmentOnly(React.memo(FeatureToggle))