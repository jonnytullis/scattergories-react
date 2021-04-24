import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Button, Grid, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LoopIcon from '@material-ui/icons/Loop'
import { useMutation } from '@apollo/client'

import { UPDATE_PROMPTS } from '../../../GQL/mutations'
import useStyles from './PromptsView.styles'
import { useAlert } from '../../../hooks'

const loadingTypes = {
  showHide: 'showHide',
  newPrompts: 'newPrompts',
  none: 'none'
}

export default function PromptsView({ prompts, hidden, isHost, disabled }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ updatePrompts ] = useMutation(UPDATE_PROMPTS)
  const [ loading, setLoading ] = useState(() => loadingTypes.none)

  useEffect(() => {
    setLoading(loadingTypes.none)
  }, [ hidden, prompts ])

  async function doUpdatePrompts(newPrompts, hidden) {
    await updatePrompts({ variables: {
      newPrompts,
      hidden
    } }).catch(() => {
      raiseAlert({
        message: 'Error getting new prompts. Please try again.',
        severity: 'error',
      })
    })
  }

  async function handleNewPrompts() {
    setLoading(loadingTypes.newPrompts)
    await doUpdatePrompts(true, true)
  }

  async function handleShowHide() {
    setLoading(loadingTypes.showHide)
    await doUpdatePrompts(false, !hidden)
  }

  return (
    <div className={classes.wrapper}>
      {prompts.map((text, index) => {
        return (
          <div className={classes.lineWrapper} key={text}>
            <div className={classes.line}>
              <div className={classes.lineNumber}>
                {index + 1}.
              </div>
              <div className={clsx({ [classes.blank]: hidden })}>
                <div className={clsx({ [classes.hiddenText]: hidden })}>
                  { text }
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {isHost && <Grid container justify="space-between">
        <Button
          color="primary"
          disabled={disabled}
          className={classes.actionButton}
          startIcon={loading === loadingTypes.newPrompts ? <CircularProgress size={20} /> : <LoopIcon />}
          onClick={handleNewPrompts}
        >
           New
        </Button>
        <Button
          color="primary"
          disabled={disabled}
          className={classes.actionButton}
          startIcon={loading === loadingTypes.showHide ? <CircularProgress size={20} /> :
            hidden ? <Visibility /> : <VisibilityOff />}
          onClick={handleShowHide}
        >
          {hidden ? 'Show' : 'Hide'}
        </Button>
      </Grid>}
    </div>
  )
}
