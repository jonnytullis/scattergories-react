import React from 'react'
import clsx from 'clsx'
import { Button, Grid } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'

import useStyles from './PromptsView.styles'
import EditPrompts from './EditPrompts/EditPrompts'

export default function PromptsView({ prompts, hidden, isHost, onNewPrompts, disabled }) {
  const classes = useStyles()

  function handleUpdatedPrompts() {
    console.log('REACHED')
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
        <Button disabled={disabled} style={{ alignSelf: 'center' }} onClick={onNewPrompts}>
          <LoopIcon /> &nbsp; New
        </Button>
        <EditPrompts
          disabled={disabled}
          numPrompts={prompts?.length || 0}
          onUpdate={handleUpdatedPrompts}
        />
      </Grid>}
    </div>
  )
}
