import React, { useCallback, useState } from 'react'

import ModalStopPropagation from './ModalStopPropagation'
import { getModalByType } from './modals.utils'

const useModal = ({
  type = 'primary',
  Content,
  openOnMount = false,
  ...modalProps
}) => {
  const [isOpen, setIsOpen] = useState(openOnMount)
  const [props, setProps] = useState({})

  const open = useCallback((props) => {
    setIsOpen(true)
    setProps(props)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const Modal = getModalByType(type)

  return {
    modal: (
      <ModalStopPropagation>
        <Modal
          isOpen={isOpen}
          close={close}
          {...modalProps}
          {...props}
        >
          {Content && <Content
            open={open}
            close={close}
            {...modalProps}
            {...props}
          />}
        </Modal>
      </ModalStopPropagation>
    ),
    open,
    close,
    isOpen,
  }
}

export default useModal