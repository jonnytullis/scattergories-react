import React, { useState, useCallback } from 'react'
import { IconButton, TextField, Grid, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import useStyles from './EditTime.styles'

export default function EditTime({ className, seconds, onUpdate }) {
  const classes = useStyles()
  const MAX_MINUTES = 10

  const [ openDialog, setOpenDialog ] = useState(() => false)
  const [ minutesInput, setMinutesInput ] = useState(() => getTimeSplit(seconds).minutes)
  const [ secondsInput, setSecondsInput ] = useState(() => getTimeSplit(seconds).seconds)

  function getTimeSplit(seconds) {
    return {
      minutes: String(Math.floor(seconds / 60)).padStart(2, '0'),
      seconds: String(seconds - (Math.floor(seconds / 60) * 60)).padStart(2, '0')
    }
  }

  const minutesError = useCallback(() => {
    if (Number(minutesInput) > MAX_MINUTES) {
      return '10 Max'
    }
    if (Number(minutesInput < 0)) {
      return 'No Negative'
    }
    if (Number(Number(minutesInput) === MAX_MINUTES && secondsInput > 0)) {
      return '10 Minutes Max'
    }
    return ''
  }, [ minutesInput, secondsInput ])

  const secondsError = useCallback(() => {
    if (Number(secondsInput) > 59) {
      return '59 Max'
    }
    if (Number(secondsInput < 0)) {
      return 'No Negative'
    }
    if (Number(Number(minutesInput) === MAX_MINUTES && secondsInput > 0)) {
      return '10 Minutes Max'
    }
    return ''
  }, [ minutesInput, secondsInput ])

  async function updateTimer() {
    const totalSeconds = (Number(minutesInput) * 60) + Number(secondsInput)
    if (typeof onUpdate === 'function') {
      await onUpdate(totalSeconds)
      setOpenDialog(false)
    }
  }

  return (
    <>
      {seconds &&
        <div>
          <IconButton className={className} color="primary" onClick={() => {setOpenDialog(true)}}>
            <Edit />
          </IconButton>
          <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
            <DialogTitle>
              Update Timer
            </DialogTitle>
            <DialogContent className={classes.largeText}>
              <div className={classes.inputsWrapper}>
                <TextField
                  value={minutesInput}
                  className={classes.textInput}
                  type="number"
                  variant="outlined"
                  label="Minutes"
                  inputProps={{
                    min: 0,
                    max: 10,
                    className: classes.largeText
                  }}
                  error={!!minutesError()}
                  helperText={minutesError()}
                  onInput={({ target }) => setMinutesInput(target.value?.slice(0, 2))}
                  onBlur={({ target }) => setMinutesInput(target.value?.padStart(2, '0'))}
                />
                :
                <TextField
                  value={secondsInput}
                  className={classes.textInput}
                  type="number"
                  variant="outlined"
                  label="Seconds"
                  inputProps={{
                    min: 0,
                    max: Number(minutesInput) >= MAX_MINUTES ? 0 : 59,
                    className: classes.largeText
                  }}
                  error={!!secondsError()}
                  helperText={secondsError()}
                  onInput={({ target }) => setSecondsInput(target.value?.slice(0, 2))}
                  onBlur={({ target }) => setSecondsInput(target.value?.padStart(2, '0'))}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Grid container direction="row" justify="space-between">
                <Button variant="contained" onClick={() => {setOpenDialog(false)}}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={minutesError() || secondsError()}
                  onClick={updateTimer}
                >
                  Update
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </div>
      }
    </>
  )
}