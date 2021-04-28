import React, { useState, useEffect } from 'react'
import useStyles from './LetterView.styles'
import { Button, CardContent, CircularProgress } from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import clsx from 'clsx'
import { useMutation } from '@apollo/client'

import { useAlert } from '../../../hooks'
import { NEW_LETTER } from '../../../GQL/mutations'

export default function LetterView({ letter, isHost, disabled }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ getNewLetter ] = useMutation(NEW_LETTER)
  const [ loading, setLoading ] = useState(() => false)

  useEffect(() => {
    setLoading(false)
  }, [ letter ])

  async function doGetNewLetter() {
    setLoading(true)
    try {
      await getNewLetter()
    } catch(e) {
      raiseAlert({
        message: 'Error getting new letter. Please try again.',
        severity: 'error',
      })
    }
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
        <Button
          disabled={disabled || loading}
          color="primary"
          onClick={doGetNewLetter}
          startIcon={loading ? <CircularProgress size={20} /> : <LoopIcon />}
        >
           New
        </Button>
      </div>
    </div>
  )
}
