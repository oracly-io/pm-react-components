import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { trim } from 'lodash'
import cn from 'clsx'

import Edit from '../../SVG/Edit'
import UserHint from '../../SVG/UserHint'
import CloseIcon from '../../SVG/CloseIcon'

import { useTransition } from '../../../../hooks/useTransition'

import css from './Nickname.module.scss';

const localStorageSelector = 'pm-react-components-username-hint-closed'

const Nickname = ({
  address,
  username,
  editable,
  collapsed,
  onNicknameChanged,
}) => {
  const [inputValue, setInputValue] = useState(username)
  const [editingNickname, setEditNickname] = useState(false)
  const [showHint, setShowHint] = useState(!username && localStorage.getItem(localStorageSelector) !== 'true')

  const timeout = 100 //ms
  const [mountHint, showingHint] = useTransition(showHint, timeout)

  const isEdit = editable && (editingNickname || !username)

  const handleNicknameSave = useCallback(() => {
    if (!inputValue) return
    if (!onNicknameChanged) return

    closeHint()
    setEditNickname(false)
    onNicknameChanged({ address, nickname: trim(inputValue).substring(0, 35) })

  }, [onNicknameChanged, inputValue, address])

  const changingNickname = useCallback((e) => { setInputValue(e.target.value) }, [setInputValue])

  const closeHint = useCallback(() => {
    localStorage.setItem(localStorageSelector, true)
    setShowHint(false)
  }, [])

  const startEditNickname = useCallback((e) => {
    e.stopPropagation()
    setEditNickname(true)
  }, [])

  return (
    <div className={cn(css.container, { [css.collapsed]: collapsed })}>
      <div className={cn(css.nickname, {[css.editing]: isEdit })}>

        {isEdit && (
          <>
            <input
              autoFocus={!collapsed}
              className={css.input}
              value={inputValue}
              onChange={changingNickname}
              maxLength="35"
              id="nickname"
            />
            <label
              className={cn({ [css.hasValue]: inputValue })}
              htmlFor="nickname"
            >
              User name
            </label>

            {!!inputValue && (
              <a className={css.save} onClick={handleNicknameSave}>
                Save name
              </a>
            )}
          </>
        )}
        
        {!isEdit && (
          <>
            <span className={css.text} title={username}>{username}</span>

            {editable && (
              <a
                className={css.edit}
                onClick={startEditNickname}
              >
                <Edit className={css.editicon} />
              </a>
            )}

          </>
        )}
        
        {mountHint && !collapsed && editable && (
          <div className={cn(css.hint, { [css.showingHint]: showingHint })}>
            <span className={css.close} onClick={closeHint}>
              <CloseIcon />
            </span>
            <UserHint className={css.icon} />
            <span className={css.content}>
              <span className={css.title}>
                User name
              </span>
              <span className={css.description}>
                Add a Name to your account that other players will see.
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

Nickname.propTypes = {
  address: PropTypes.string,
  username: PropTypes.string,
  editable: PropTypes.bool,
  onNicknameChanged: PropTypes.func,
}

export default Nickname