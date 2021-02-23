import React from 'react'
import useStyles from './LetterView.styles'
import { Button, CardContent, Typography } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import clsx from 'clsx'

export default function LetterView({ letter, isHost, onNewLetter }) {
  const classes = useStyles()

  const getNewLetter = () => {
    if (typeof onNewLetter === 'function') {
      onNewLetter()
    }
  }

  return (
    <div>
      <div className={classes.container}>
        <CardContent>
          <Typography variant="h1" className={classes.letter}>
            {letter}
          </Typography>
        </CardContent>
      </div>
      <div className={clsx(classes.buttonContainer, { [classes.hide]: !isHost })}>
        <Button color="primary" onClick={getNewLetter}>
          <LoopIcon /> &nbsp; New
        </Button>
      </div>
    </div>
  )
}