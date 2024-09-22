import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import config from '../../../../config'
import OpenInNewTab from '../../SVG/OpenInNewTab'

import css from './AppsMenu.module.scss'

const menuItems = [
  { name: 'trade', label: 'Oracly App', path: config.pm_base_path },
  { name: 'staking', label: 'Staking App', path: config.st_base_path },
  { name: 'mentoring', label: 'Mentoring App', path: config.mt_base_path },
]

const AppsMenu = ({ active }) => {

  const navigate = (path) => {
    const url = `${window.location.protocol}//${window.location.host}${path}`
    window.history.pushState(null, '', url)
    window.location.href = url
  }

  return (
    <div className={css.container}>
      <div className={css.title}>Apps</div>
      <ul className={css.menu}>
        {menuItems
          .filter(({ name }) => name !== active )
          .map(({ name, label, path }, index) => (
            <Fragment key={name}>
              {index !== 0 && <div />}
              <li>
                <a onClick={() => navigate(path)}>
                  <span>{label}</span>
                  <OpenInNewTab />
                </a>
              </li>
            </Fragment>
          ))
        }
      </ul>
    </div>
  )
}

AppsMenu.propTypes = {
  active: PropTypes.string,
}

export default AppsMenu