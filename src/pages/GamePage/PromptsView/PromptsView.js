import React from 'react'
import clsx from 'clsx'
import { Button, Grid } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import { useMutation } from '@apollo/client'
import {
  UPDATE_SETTINGS,
  UPDATE_PROMPTS
} from '../../../GQL/mutations'

import useStyles from './PromptsView.styles'
import { useAlert } from '../../../hooks'
import EditPrompts from './EditPrompts/EditPrompts'

export default function PromptsView({ prompts, hidden, isHost, disabled }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ updatePrompts ] = useMutation(UPDATE_PROMPTS)
  const [ updateSettings ] = useMutation(UPDATE_SETTINGS)

  async function onSettingsUpdate(options) {
    await updateSettings({ variables: { settings: options } }).catch(() => {
      raiseAlert({
        message: 'Error updating settings',
        severity: 'error',
      })
    })
    await doUpdatePrompts(true, hidden)
  }

  async function doUpdatePrompts(newPrompts, hidden) {
    await updatePrompts({ variables: {
      newPrompts,
      hidden
    } }).catch(() => {
      raiseAlert({
        message: 'Error getting new prompts',
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
        <Button disabled={disabled} style={{ alignSelf: 'center' }} onClick={() => { doUpdatePrompts(true, hidden) }}>
          <LoopIcon /> &nbsp; New
        </Button>
        <Button disabled={disabled} style={{ alignSelf: 'center' }} onClick={() => { doUpdatePrompts(false, !hidden)}}>
          {hidden ? 'Show' : 'Hide'}
        </Button>
        <EditPrompts
          disabled={disabled}
          numPrompts={prompts?.length || 0}
          onUpdate={onSettingsUpdate}
        />
      </Grid>}
    </div>
  )
}
