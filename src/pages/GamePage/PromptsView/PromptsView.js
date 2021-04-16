import React from 'react'
import clsx from 'clsx'
import { Button, Grid } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LoopIcon from '@material-ui/icons/Loop'
import { useMutation } from '@apollo/client'
import { UPDATE_PROMPTS } from '../../../GQL/mutations'

import useStyles from './PromptsView.styles'
import { useAlert } from '../../../hooks'

export default function PromptsView({ prompts, hidden, isHost, disabled }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ updatePrompts ] = useMutation(UPDATE_PROMPTS)

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
          startIcon={<LoopIcon />}
          onClick={() => { doUpdatePrompts(true, hidden) }}
        >
           New
        </Button>
        <Button
          color="primary"
          disabled={disabled}
          className={classes.actionButton}
          startIcon={hidden ? <Visibility /> : <VisibilityOff />}
          onClick={() => { doUpdatePrompts(false, !hidden)}}
        >
          {hidden ? 'Show' : 'Hide'}
        </Button>
      </Grid>}
    </div>
  )
}
