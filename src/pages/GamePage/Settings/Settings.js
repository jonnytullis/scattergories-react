import React, { useState, useMemo } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { useMutation } from '@apollo/client'

import { UPDATE_SETTINGS } from '../../../GQL/mutations'
import { useAlert } from '../../../hooks'
import useStyles from './Settings.styles'
import InputNumPrompts from './InputNumPrompts/InputNumPrompts'
import InputTime from './InputTime/InputTime'
import Section from './Section/Section'

export default function Settings({ disabled, settings }) {
  const classes = useStyles()
  const { raiseAlert } = useAlert()
  const [ updateSettings ] = useMutation(UPDATE_SETTINGS)
  const [ dialogOpen, setDialogOpen ] = useState(() => false)
  const [ loading, setLoading ] = useState(() => false)

  // Settings values
  const [ timerSeconds, setTimerSeconds ] = useState(() => settings.timerSeconds)
  const [ numPrompts, setNumPrompts ] = useState(() => settings.numPrompts)

  // Error values
  const [ timerSecondsError, setTimerSecondsError ] = useState(() => false)
  const [ numPromptsError, setNumPromptsError ] = useState(() => false)

  const isError = useMemo(() => {
    return timerSecondsError || numPromptsError
  }, [ timerSecondsError, numPromptsError ])

  async function onSubmit() {
    setLoading(true)
    try {
      await updateSettings({ variables: {
        settings: {
          timerSeconds,
          numPrompts
        }
      } })
      setDialogOpen(false)
    } catch(e) {
      raiseAlert({
        message: 'Error updating settings. Please try again.',
        severity: 'error',
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <IconButton
        disabled={disabled}
        variant="contained"
        color="inherit"
        onClick={() => {setDialogOpen(true)}}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog open={!disabled && dialogOpen} className={classes.dialog}>
        <DialogTitle>
          Game Settings
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Section title="Prompts">
            <InputNumPrompts numPrompts={numPrompts} setNumPrompts={setNumPrompts} setError={setNumPromptsError} />
          </Section>
          <Section title="Timer">
            <InputTime seconds={timerSeconds} setSeconds={setTimerSeconds} setError={setTimerSecondsError} />
          </Section>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="space-between">
            <Button onClick={() => {setDialogOpen(false)}}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isError}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Check /> }
              onClick={onSubmit}
            >
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}
