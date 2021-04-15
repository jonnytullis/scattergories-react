import React, { useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid } from '@material-ui/core'

import useStyles from './Settings.styles'
import InputNumPrompts from './InputNumPrompts/InputNumPrompts'
import InputTime from './InputTime/InputTime'
import Section from './Section/Section'

export default function Settings({ disabled, settings }) {
  const classes = useStyles()
  const [ dialogOpen, setDialogOpen ] = useState(() => false)

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
          Settings
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Section title="Prompts">
            <InputNumPrompts numPrompts={settings.numPrompts} />
          </Section>
          <Section title="Timer">
            <InputTime seconds={settings.timerSeconds} />
          </Section>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="space-between">
            <Button onClick={() => {setDialogOpen(false)}}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}
