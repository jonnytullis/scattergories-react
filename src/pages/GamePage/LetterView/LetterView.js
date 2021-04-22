import React from 'react'
import useStyles from './LetterView.styles'
import { Button, CardContent } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import clsx from 'clsx'
import { useMutation } from '@apollo/client'

import { useAlert } from '../../../hooks'
import { NEW_LETTER } from '../../../GQL/mutations'

export default function LetterView({ letter, isHost, disabled }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ getNewLetter ] = useMutation(NEW_LETTER)

  function doGetNewLetter() {
    getNewLetter().catch(() => {
      raiseAlert({
        message: 'Error getting new letter. Please try again.',
        severity: 'error',
      })
    })
  }

  return (
    <div>
      <div className={classes.container}>
        <CardContent>
          <h1 className={classes.letter}>
            {letter}
          </h1>
        </CardContent>
      </div>
      <div className={clsx(classes.buttonContainer, { [classes.hide]: !isHost })}>
        <Button disabled={disabled} color="primary" onClick={doGetNewLetter} startIcon={<LoopIcon />}>
           New
        </Button>
      </div>
    </div>
  )
}
