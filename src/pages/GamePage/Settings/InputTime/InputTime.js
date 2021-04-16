import React, { useState, useMemo, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import useStyles from './InputTime.styles'

export default function InputTime({ seconds, setSeconds, setError }) {
  const classes = useStyles()
  const MAX_MINUTES = 10

  const [ minutesInput, setMinutesInput ] = useState(() => getTimeSplit(seconds).minutes)
  const [ secondsInput, setSecondsInput ] = useState(() => getTimeSplit(seconds).seconds)

  function getTimeSplit(seconds) {
    return {
      minutes: String(Math.floor(seconds / 60)).padStart(2, '0'),
      seconds: String(seconds - (Math.floor(seconds / 60) * 60)).padStart(2, '0')
    }
  }

  const minutesError = useMemo(() => {
    if (Number(minutesInput) > MAX_MINUTES) {
      return '10 minutes max'
    }
    if (Number(minutesInput < 0)) {
      return 'No negative'
    }
    return ''
  }, [ minutesInput ])

  const secondsError = useMemo(() => {
    if (Number(secondsInput) > 59) {
      return '59 seconds max'
    }
    if (Number(secondsInput < 0)) {
      return 'No negative'
    }
    return ''
  }, [ secondsInput ])

  const inputError = useMemo(() => {
    if (Number(minutesInput) === MAX_MINUTES && Number(secondsInput) > 0) {
      return '10 minutes max'
    }
    if (Number(minutesInput) <= 0 && Number(secondsInput) < 30) {
      return '30 seconds min'
    }
    return ''
  }, [ minutesInput, secondsInput ])

  // Update the total seconds value when any input changes
  useEffect(() => {
    if (!minutesError || secondsError || inputError) {
      setError(false)
      setSeconds(Number(minutesInput * 60) + Number(secondsInput))
    } else {
      setError(true)
    }
  }, [ secondsInput, minutesInput, minutesError, secondsError, inputError, setSeconds, setError ])

  return (
    <>
      {seconds &&
        <div className={classes.inputsWrapper}>
          <TextField
            value={minutesInput}
            fullWidth
            margin="dense"
            type="number"
            variant="outlined"
            label="Minutes"
            inputProps={{
              min: 0,
              max: 10,
            }}
            error={!!minutesError || !!inputError}
            helperText={minutesError || ' '}
            onInput={({ target }) => setMinutesInput(target.value?.slice(0, 2))}
            onBlur={({ target }) => setMinutesInput(target.value?.padStart(2, '0'))}
          />
          <div className={classes.spacer} />
          <TextField
            value={secondsInput}
            fullWidth
            margin="dense"
            type="number"
            variant="outlined"
            label="Seconds"
            inputProps={{
              min: Number(minutesInput) <= 0 ? 30 : 0,
              max: Number(minutesInput) >= MAX_MINUTES ? 0 : 59,
            }}
            error={!!secondsError || !!inputError}
            helperText={secondsError || inputError || ' '}
            onInput={({ target }) => setSecondsInput(target.value?.slice(0, 2))}
            onBlur={({ target }) => setSecondsInput(target.value?.padStart(2, '0'))}
          />
        </div>
      }
    </>
  )
}
