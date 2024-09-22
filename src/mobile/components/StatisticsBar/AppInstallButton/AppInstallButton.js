import React from 'react'
import PropTypes from 'prop-types'

import AnimatedButton from '../../common/AnimatedButton'

import css from './AppInstallButton.module.scss'

const AppInstallButton = ({ className, onClick }) => {

  return (
      <AnimatedButton
        className={css.btn}
        onClick={onClick}
        borderWidth="1px"
      >
        <span className={css.title}>Install App</span>
      </AnimatedButton>
  )
}

AppInstallButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default AppInstallButton