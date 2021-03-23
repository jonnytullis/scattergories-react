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
          <div className={clsx(classes.lineWrapper, { [classes.blank]: hidden })} key={text}>
            <div className={clsx(classes.line, { [classes.hiddenText]: hidden })}>
              <div className={classes.lineNumber}>
                {index + 1}.
              </div>
              { text }
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
