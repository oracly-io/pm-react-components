import React, { useCallback, useMemo } from 'react'
import Modal from 'react-modal'

import config from '../../../../config'
import CloseIcon from '../../SVG/CloseIcon'
import Button from '../../common/Button'

import css from './PrimaryModal.module.scss'

const modalClasses = {
  base: css.base,
  afterOpen: css.afterOpen,
  beforeClose: css.beforeClose,
}

const modalOverlayClasses = {
  base: css.overlayBase,
  afterOpen: css.afterOpenOverlay,
  beforeClose: css.beforeCloseOverlay,
}

const PrimaryModal = ({ children, close, hideClose, ...modalProps }) => {
  const parentSelector = useCallback(() => document.getElementById(config.modal_id), [])
  const appEl = useMemo(() => document.getElementById(config.react_mount_element_id), [])

  return (
    <Modal
      appElement={appEl}
      closeTimeoutMS={300}
      className={modalClasses}
      overlayClassName={modalOverlayClasses}
      onRequestClose={close}
      parentSelector={parentSelector}
      {...modalProps}
    >
      {!hideClose && (
        <Button
          onClick={close}
          className={css.close}
        >
          <CloseIcon />
        </Button>
      )}
      {children}
    </Modal>
  )
}

export default PrimaryModal
