import React from 'react'
import clsx from 'clsx'
import { Button, Grid } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import useStyles from './PromptsView.styles'

export default function PromptsView({ prompts, hidden, isHost, onNewPrompts, disabled }) {
  const classes = useStyles()

  function handleNewPromptsClicked() {
    if (typeof onNewPrompts === 'function') {
      onNewPrompts()
    }
  }

  return (
    <div>
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
      {isHost && <Grid container justify="center">
        <Button disabled={disabled} style={{ alignSelf: 'center' }} onClick={handleNewPromptsClicked}>
          <LoopIcon /> &nbsp; New
        </Button>
      </Grid>}
    </div>
  )
}
