import React from 'react'
import PropTypes from 'prop-types'

import css from './Achievements.module.scss'

const Achievement1 = () => <div style={{ width: '40px', 'height': '40px', backgroundColor: '#28c9c4' }}></div>
const Achievement2 = () => <div style={{ width: '60px', 'height': '60px', backgroundColor: '#a1c9c8' }}></div>

const mock = [Achievement1, Achievement2]

const Achievements = ({ achievements = [] }) => {
  return (
    <div className={css.container}>
      {achievements.map((achievement) => mock[achievement])}
    </div>
  )
}

Achievements.propTypes = {
  achievements: PropTypes.array,
}

export default Achievements